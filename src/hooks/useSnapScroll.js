import { useEffect, useRef } from 'react';

const NAVBAR_HEIGHT = 64;
const DEBOUNCE_MS = 200;
const SNAP_DURATION_MS = 800;
const MIN_DELTA = 10;

export function useSnapScroll(sectionRefs) {
  const timerRef = useRef(null);
  const isSnappingRef = useRef(false);
  const startYRef = useRef(null);
  const refsRef = useRef(sectionRefs);

  useEffect(() => {
    refsRef.current = sectionRefs;
  });

  useEffect(() => {
    const getSections = () =>
      refsRef.current.map(r => r.current).filter(Boolean);

    const getCurrentIndex = (sections) => {
      const threshold = window.scrollY + NAVBAR_HEIGHT;
      let currentIndex = 0;
      let minDist = Infinity;
      sections.forEach((el, i) => {
        const dist = Math.abs(el.offsetTop - threshold);
        if (dist < minDist) {
          minDist = dist;
          currentIndex = i;
        }
      });
      return currentIndex;
    };

    const snapByDirection = () => {
      if (isSnappingRef.current) return;

      const sections = getSections();
      if (!sections.length) return;

      const currentY = window.scrollY;
      const startY = startYRef.current ?? currentY;
      const delta = currentY - startY;

      // Reset startY for next gesture regardless of whether we snap
      startYRef.current = null;

      if (Math.abs(delta) < MIN_DELTA) return;

      const direction = delta > 0 ? 1 : -1;
      const currentIndex = getCurrentIndex(sections);
      const targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
      const target = sections[targetIndex];

      isSnappingRef.current = true;
      window.scrollTo({ top: target.offsetTop - NAVBAR_HEIGHT, behavior: 'smooth' });
      setTimeout(() => {
        isSnappingRef.current = false;
      }, SNAP_DURATION_MS);
    };

    const onScroll = () => {
      if (isSnappingRef.current) return;

      // Save scroll position at the start of each new gesture
      if (startYRef.current === null) {
        startYRef.current = window.scrollY;
      }

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(snapByDirection, DEBOUNCE_MS);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timerRef.current);
    };
  }, []);
}
