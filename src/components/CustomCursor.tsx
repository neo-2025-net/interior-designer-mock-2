import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const overInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="expand"]')) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', overInteractive);
    document.addEventListener('mouseleave', () => setVisible(false));

    let raf: number;
    const animate = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', overInteractive);
      cancelAnimationFrame(raf);
    };
  }, [pos.x, pos.y]);

  if (!visible) return null;

  return (
    <>
      <div
        className="cursor-dot hidden md:block"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`cursor-ring hidden md:block ${expanded ? 'expanded' : ''}`}
        style={{ left: ringPos.x, top: ringPos.y }}
      />
    </>
  );
}
