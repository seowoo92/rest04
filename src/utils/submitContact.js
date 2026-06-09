export async function submitContactForm(data) {
  // TODO: DB 저장 연동 시 아래 주석을 해제하고 실제 API 엔드포인트로 교체
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) throw new Error('제출에 실패했습니다.');
  // return response.json();

  console.log('[Contact] 폼 제출:', data);
  return new Promise(resolve => setTimeout(resolve, 600));
}
