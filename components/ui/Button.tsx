import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "rose-outline" | "gold-outline" | "ghost";
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
      "relative inline-flex items-center justify-center font-sans font-bold tracking-wide transition-all duration-300 rounded-xl select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-rose text-obsidian font-bold hover:bg-rose-light hover:shadow-rose-glow hover:-translate-y-0.5 border border-rose/30",
      secondary:
        "bg-surface-raised border border-rose/30 text-cream hover:bg-rose/15 hover:border-rose/50 hover:text-white shadow-sm",
      "rose-outline":
        "bg-transparent border border-rose/40 text-rose hover:bg-rose/10 hover:border-rose",
      "gold-outline":
        "bg-transparent border border-rose/40 text-rose hover:bg-rose/10 hover:border-rose",
      ghost:
        "bg-transparent text-taupe hover:text-cream hover:bg-white/[0.06]",
    };

    const sizes = {
      sm: "h-10 px-4 text-xs uppercase tracking-widest",
      md: "h-12 px-7 text-sm",
      lg: "h-14 px-9 text-base",
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
