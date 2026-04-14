import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-[46px] w-[46px] text-[15px]",
  md: "h-[58px] w-[58px] text-[18px]",
  lg: "h-[92px] w-[92px] text-[28px]",
  xl: "h-[112px] w-[112px] text-[34px]",
};

const shapeClasses = {
  circle: "rounded-full",
  rounded: "rounded-[24px]",
};

export default function ShareAvatar({
  name,
  initials,
  gradient,
  imageSrc,
  size = "md",
  shape = "circle",
  className,
  onClick,
  interactive = false,
  ariaLabel,
}) {
  const fallbackInitials = name
    ?.split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const isInteractive = interactive || Boolean(onClick);
  const Component = isInteractive ? "button" : "div";

  return (
    <Component
      type={isInteractive ? "button" : undefined}
      aria-label={ariaLabel ?? name}
      onClick={onClick}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-border text-center font-semibold tracking-[-0.04em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]",
        sizeClasses[size],
        shapeClasses[shape],
        isInteractive
          ? "cursor-pointer transition duration-200 hover:-translate-y-[1px] hover:shadow-[0_22px_48px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
          : null,
        className,
      )}
      style={{
        background:
          gradient ??
          "linear-gradient(135deg, var(--primary), var(--secondary))",
      }}
    >
      <span className="sr-only">{ariaLabel ?? name}</span>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      ) : (
        initials ?? fallbackInitials
      )}
    </Component>
  );
}
