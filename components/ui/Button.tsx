import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "rose-outline" | "ghost";
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
      "relative inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-300 rounded-xl select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-b from-[#e35691] via-[#c83b74] to-[#af2762] text-white font-semibold hover:from-[#eb68a0] hover:to-[#bc2e6a] shadow-button-3d hover:shadow-rose-glow hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-inner border-t border-white/35 border-b border-rose-900/40",
      secondary:
        "bg-gradient-to-b from-white to-[#f8fafc] border border-slate-200 text-slate-800 font-semibold shadow-button-secondary-3d hover:border-rose-400 hover:text-rose hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-inner",
      "rose-outline":
        "bg-white/95 border-2 border-rose text-rose font-semibold hover:bg-rose-50/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5",
      ghost:
        "bg-transparent text-slate-700 hover:text-rose hover:bg-rose-50/60 transition-colors",
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
