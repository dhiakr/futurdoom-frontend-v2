/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-[8px] rounded-full border font-semibold whitespace-nowrap select-none outline-none transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[var(--ring-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 group-hover/button:[&_svg]:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--primary)] text-[var(--text-on-primary)] shadow-[0_16px_36px_rgba(255,120,200,0.24)] hover:-translate-y-[1px] hover:bg-[var(--primary-hover)] hover:shadow-[0_22px_42px_rgba(255,120,200,0.34)]",
        outline:
          "border-border bg-[var(--glass-muted)] text-[var(--text-muted)] shadow-[0_14px_28px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] hover:border-[color:var(--border-brand)] hover:bg-[var(--fill-brand-soft)] hover:text-foreground",
        secondary:
          "border-[color:var(--border)] bg-[var(--glass-subtle)] text-[var(--text-muted)] shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:-translate-y-[1px] hover:border-border hover:bg-[var(--glass-strong)] hover:text-foreground",
        ghost:
          "border-transparent bg-transparent text-[var(--text-muted)] hover:-translate-y-[1px] hover:bg-[var(--glass-muted)] hover:text-foreground",
        destructive:
          "border-transparent bg-[var(--danger)] text-white shadow-[0_14px_32px_rgba(255,107,138,0.24)] hover:-translate-y-[1px] hover:bg-[#ff86a0]",
        link: "border-transparent bg-transparent p-0 text-[var(--primary)] hover:text-foreground",
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
