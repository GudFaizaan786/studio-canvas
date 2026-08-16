import { useRef, useState, type ComponentProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = Omit<ComponentProps<typeof motion.a>, "ref"> & {
  variant?: "primary" | "ghost";
  withArrow?: boolean;
};

/** Magnetic CTA link with an arrow that slides on hover. */
export const MagneticLink = ({
  variant = "primary",
  withArrow = true,
  className,
  children,
  ...rest
}: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (r.left + r.width / 2)) * 0.18,
          y: (e.clientY - (r.top + r.height / 2)) * 0.28,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-ring",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-accent"
          : "border border-border bg-card/60 text-foreground hover:border-primary/50 hover:text-primary",
        className,
      )}
      {...rest}
    >
      {children}
      {withArrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </motion.a>
  );
};
