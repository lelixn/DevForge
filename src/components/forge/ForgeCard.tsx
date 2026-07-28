import { forwardRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ForgeCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  hoverable?: boolean;
  glow?: boolean;
  gradientBorder?: boolean;
  spotlight?: boolean;
  blueprint?: boolean;
  children?: React.ReactNode;
}

const ForgeCard = forwardRef<HTMLDivElement, ForgeCardProps>(
  (
    {
      children,
      className,
      hoverable = false,
      glow = false,
      gradientBorder = false,
      spotlight = false,
      blueprint = false,
      ...props
    },
    ref
  ) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!spotlight) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={
          hoverable
            ? {
                y: -3,
                boxShadow: '0 16px 40px -10px rgba(0,0,0,0.8), 0 0 20px rgba(124,58,237,0.15)',
              }
            : {}
        }
        className={cn(
          'relative rounded-[24px] border border-[var(--df-border)] bg-[var(--df-card)] p-6 shadow-[var(--df-shadow-sm)] transition-all duration-300 overflow-hidden',
          hoverable && 'hover:border-[var(--df-border-strong)]',
          glow && 'shadow-[var(--df-shadow-glow)] border-[rgba(124,58,237,0.3)]',
          blueprint && 'bg-blueprint-grid border-[rgba(6,182,212,0.2)]',
          className
        )}
        {...props}
      >
        {/* Spotlight Effect */}
        {spotlight && isHovered && (
          <div
            className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.12), transparent 40%)`,
            }}
          />
        )}

        {/* Animated Gradient Border */}
        {gradientBorder && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[24px] bg-[var(--df-gradient-accent)] opacity-20"
            style={{
              padding: '1px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        )}

        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

ForgeCard.displayName = 'ForgeCard';

export { ForgeCard };
