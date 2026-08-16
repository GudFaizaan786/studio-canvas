import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

export const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) => (
  <Reveal className={cn(align === "center" && "text-center mx-auto max-w-3xl", className)}>
    {eyebrow && (
      <span className="eyebrow">
        <span className="h-px w-6 bg-primary/60" aria-hidden="true" />
        {eyebrow}
      </span>
    )}
    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05]">{title}</h2>
    {description && (
      <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    )}
  </Reveal>
);
