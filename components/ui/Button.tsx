import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold-outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-300 rounded-full select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gold text-obsidian font-semibold hover:bg-gold-light hover:shadow-luxury-glow hover:-translate-y-0.5",
      secondary:
        "bg-transparent border border-white/15 text-cream hover:bg-white/[0.06] hover:border-white/30 hover:text-white",
      "gold-outline":
        "bg-transparent border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold",
      ghost:
        "bg-transparent text-taupe hover:text-cream hover:bg-white/[0.04]",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs uppercase tracking-widest",
      md: "h-12 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
