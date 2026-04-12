/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-[8px] rounded-full border font-semibold whitespace-nowrap select-none outline-none transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 group-hover/button:[&_svg]:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] shadow-[0_16px_36px_rgba(255,120,200,0.24)] hover:-translate-y-[1px] hover:bg-[var(--color-brand-primary-hover)] hover:shadow-[0_22px_42px_rgba(255,120,200,0.34)]",
        outline:
          "border-white/12 bg-[rgb(255_255_255/0.06)] text-white/84 shadow-[0_14px_28px_rgba(0,0,0,0.14)] hover:-translate-y-[1px] hover:border-[color:var(--color-border-brand)] hover:bg-[var(--color-fill-brand-soft)] hover:text-white",
        secondary:
          "border-[color:var(--color-border-muted)] bg-[rgb(255_255_255/0.04)] text-white/78 shadow-[0_12px_24px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] hover:border-white/14 hover:bg-[rgb(255_255_255/0.08)] hover:text-white",
        ghost:
          "border-transparent bg-transparent text-white/62 hover:-translate-y-[1px] hover:bg-[rgb(255_255_255/0.06)] hover:text-white",
        destructive:
          "border-transparent bg-[var(--color-danger)] text-white shadow-[0_14px_32px_rgba(255,107,138,0.24)] hover:-translate-y-[1px] hover:bg-[#ff86a0]",
        link: "border-transparent bg-transparent p-0 text-[var(--color-brand-accent-soft)] hover:text-white",
      },
      size: {
        default: "h-[42px] px-[16px] text-[13px]",
        xs: "h-[32px] px-[10px] text-[12px]",
        sm: "h-[36px] px-[12px] text-[12px]",
        lg: "h-[46px] px-[18px] text-[14px]",
        icon: "h-[42px] w-[42px] px-0",
        "icon-xs": "h-[32px] w-[32px] px-0",
        "icon-sm": "h-[36px] w-[36px] px-0",
        "icon-lg": "h-[46px] w-[46px] px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
