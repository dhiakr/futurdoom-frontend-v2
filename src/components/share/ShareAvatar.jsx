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
  showStatus = false,
}) {
  const fallbackInitials = name
    ?.split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        aria-label={name}
        className={cn(
          "inline-flex items-center justify-center overflow-hidden border border-white/14 text-center font-semibold tracking-[-0.04em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)]",
          sizeClasses[size],
          shapeClasses[shape],
        )}
        style={{
          background:
            gradient ??
            "linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))",
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          initials ?? fallbackInitials
        )}
      </div>

      {showStatus ? (
        <span className="absolute bottom-[6px] right-[6px] h-[14px] w-[14px] rounded-full border-2 border-[color:var(--color-surface-base)] bg-[var(--color-success)] shadow-[0_0_18px_rgba(110,255,168,0.6)]" />
      ) : null}
    </div>
  );
}
