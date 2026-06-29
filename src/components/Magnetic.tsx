import { useRef, useEffect, ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'div' | 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function Magnetic({
  children,
  className = '',
  strength = 0.35,
  as = 'div',
  href,
  target,
  rel,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  const Tag = as as any;

  return (
    <Tag
      ref={ref as any}
      className={`magnetic-btn ${className}`}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}
