-- ============================================================
  -- AICADEMY (rest04) — 게시판 + 인증 스키마
  -- ⚠️  이 Supabase 프로젝트는 다른 앱과 공유됩니다. 모든 객체에 r04_ 접두어로 격리.
  --    auth.users 트리거는 건드리지 않습니다. (여러 번 실행해도 안전)
  -- ============================================================

  -- 1) 프로필 (auth.users 1:1) — 트리거 대신 클라이언트가 첫 로그인 시 생성
  create table if not exists public.r04_profiles (
    id         uuid primary key references auth.users(id) on delete cascade,
    nickname   text not null default '회원',
    role       text not null default 'user',   -- 'user' | 'admin'
    created_at timestamptz not null default now()
  );

  -- 운영자 판별 헬퍼 (security definer → profiles RLS 재귀 방지)
  create or replace function public.r04_is_admin()
  returns boolean language sql stable security definer set search_path = public
  as $$
    select exists (select 1 from public.r04_profiles where id = auth.uid() and role = 'admin');
  $$;

  -- 2) 게시글
  create table if not exists public.r04_posts (
    id            uuid primary key default gen_random_uuid(),
    category      text not null,                 -- 'notice' | 'free' | 'qna'
    title         text not null,
    content       text not null,
    author_id     uuid not null references auth.users(id) on delete cascade,
    author_name   text not null,
    view_count    int  not null default 0,
    comment_count int  not null default 0,
    created_at    timestamptz not null default now(),
    updated_at    timestamptz not null default now()
  );
  create index if not exists r04_posts_category_created_idx
    on public.r04_posts (category, created_at desc);

  -- 3) 댓글 / 답변
  create table if not exists public.r04_comments (
    id          uuid primary key default gen_random_uuid(),
    post_id     uuid not null references public.r04_posts(id) on delete cascade,
    content     text not null,
    author_id   uuid not null references auth.users(id) on delete cascade,
    author_name text not null,
    is_answer   boolean not null default false,  -- Q&A 운영자 답변 표시
    created_at  timestamptz not null default now()
  );
  create index if not exists r04_comments_post_idx on public.r04_comments (post_id);

  -- 댓글 수 동기화 (security definer 필수: 남의 글 댓글 시 RLS 우회해 카운트 갱신)
  create or replace function public.r04_sync_comment_count()
  returns trigger language plpgsql security definer set search_path = public as $$
  begin
    if tg_op = 'INSERT' then
      update public.r04_posts set comment_count = comment_count + 1 where id = new.post_id;
    elsif tg_op = 'DELETE' then
      update public.r04_posts set comment_count = greatest(comment_count - 1, 0) where id = old.post_id;
    end if;
    return null;
  end;
  $$;
  drop trigger if exists r04_comments_count_trg on public.r04_comments;
  create trigger r04_comments_count_trg
    after insert or delete on public.r04_comments
    for each row execute function public.r04_sync_comment_count();

  -- 조회수 +1 (security definer → 비로그인도 조회수 증가)
  create or replace function public.r04_increment_view(post_id uuid)
  returns void language sql security definer set search_path = public
  as $$
    update public.r04_posts set view_count = view_count + 1 where id = post_id;
  $$;

  -- 4) RLS
  alter table public.r04_profiles enable row level security;
  alter table public.r04_posts    enable row level security;
  alter table public.r04_comments enable row level security;

  -- profiles: 조회 누구나 / 본인 행만 생성(role=user 고정) / UPDATE 정책 없음(role 상승 차단)
  drop policy if exists r04_profiles_select on public.r04_profiles;
  create policy r04_profiles_select on public.r04_profiles for select using (true);
  drop policy if exists r04_profiles_insert on public.r04_profiles;
  create policy r04_profiles_insert on public.r04_profiles for insert
    with check (auth.uid() = id and role = 'user');
  drop policy if exists r04_profiles_update on public.r04_profiles;

  -- posts
  drop policy if exists r04_posts_select on public.r04_posts;
  create policy r04_posts_select on public.r04_posts for select using (true);
  drop policy if exists r04_posts_insert on public.r04_posts;
  create policy r04_posts_insert on public.r04_posts for insert
    with check (auth.uid() = author_id and (category <> 'notice' or public.r04_is_admin()));
  drop policy if exists r04_posts_update on public.r04_posts;
  create policy r04_posts_update on public.r04_posts for update
    using (auth.uid() = author_id or public.r04_is_admin());
  drop policy if exists r04_posts_delete on public.r04_posts;
  create policy r04_posts_delete on public.r04_posts for delete
    using (auth.uid() = author_id or public.r04_is_admin());

  -- comments
  drop policy if exists r04_comments_select on public.r04_comments;
  create policy r04_comments_select on public.r04_comments for select using (true);
  drop policy if exists r04_comments_insert on public.r04_comments;
  create policy r04_comments_insert on public.r04_comments for insert
    with check (auth.uid() = author_id and (is_answer = false or public.r04_is_admin()));
  drop policy if exists r04_comments_delete on public.r04_comments;
  create policy r04_comments_delete on public.r04_comments for delete
    using (auth.uid() = author_id or public.r04_is_admin());

  -- ============================================================
  -- ✅ 본인 가입/최초 로그인 후 운영자 지정 (1회):
  --   update public.r04_profiles set role = 'admin'
  --   where id = (select id from auth.users where email = 'aebon@dreamitbiz.com');
  -- ============================================================
