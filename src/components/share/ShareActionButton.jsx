import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const variantMap = {
  primary: "default",
  secondary: "outline",
  ghost: "ghost",
  subtle: "secondary",
};

const sizeMap = {
  sm: {
    withLabel: "sm",
    iconOnly: "icon-sm",
  },
  md: {
    withLabel: "default",
    iconOnly: "icon",
  },
  lg: {
    withLabel: "lg",
    iconOnly: "icon-lg",
  },
};

export default function ShareActionButton({
  icon: Icon,
  children,
  variant = "secondary",
  size = "md",
  className,
  type = "button",
  uppercase = false,
  ...props
}) {
  const resolvedSize = children
    ? sizeMap[size].withLabel
    : sizeMap[size].iconOnly;

  return (
    <Button
      type={type}
      variant={variantMap[variant]}
      size={resolvedSize}
      className={cn(
        uppercase ? "uppercase tracking-[0.18em]" : "tracking-[-0.01em]",
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className="h-[15px] w-[15px]" /> : null}
      {children ? <span>{children}</span> : null}
    </Button>
  );
}
