import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const navItems = [
  { label: "Platform", to: "/platform" },
  { label: "Developers", to: "/developers" },
  { label: "Resources", to: "/resources" },
  { label: "Share", to: "/share" },
];

const navLinkClassName =
  "inline-flex items-center justify-center rounded-full px-[18px] py-[10px] text-[12px] font-semibold uppercase tracking-[0.2em] text-white/72 transition duration-200 hover:bg-[var(--color-fill-brand-soft)] hover:text-white";

const primaryCtaClassName =
  "inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-[24px] py-[12px] text-[15px] font-semibold text-[var(--color-text-on-brand)] no-underline shadow-[0_0_36px_rgba(255,120,200,0.28)] transition duration-200 hover:bg-[var(--color-brand-primary-hover)] hover:shadow-[0_0_48px_rgba(255,120,200,0.38)]";

const secondaryCtaClassName =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[var(--color-surface-glass-strong)] px-[22px] py-[12px] text-[15px] font-medium text-white/82 no-underline transition duration-200 hover:border-[color:var(--color-border-brand)] hover:bg-[var(--color-fill-brand-soft)] hover:text-white";

const NAV_EXPANDED_MAX_WIDTH = 1340;
const NAV_COMPACT_MAX_WIDTH = 1040;
const NAV_SCROLL_RANGE = 180;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function interpolate(start, end, progress) {
  return start + (end - start) * progress;
}

export default function Navbar() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isDrawerOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    let frameId = 0;

    const updateScrollProgress = () => {
      frameId = 0;

      const nextScrollProgress = clamp(
        window.scrollY / NAV_SCROLL_RANGE,
        0,
        1,
      );

      setScrollProgress((previousScrollProgress) =>
        Math.abs(previousScrollProgress - nextScrollProgress) < 0.01
          ? previousScrollProgress
          : nextScrollProgress,
      );
    };

    const handleScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrollProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isCompact = scrollProgress > 0.08;
  const navShellStyle = {
    maxWidth: `${interpolate(
      NAV_EXPANDED_MAX_WIDTH,
      NAV_COMPACT_MAX_WIDTH,
      scrollProgress,
    )}px`,
    backgroundColor: `rgb(var(--color-overlay-brand-soft-rgb) / ${interpolate(
      0.38,
      0,
      scrollProgress,
    ).toFixed(3)})`,
    borderColor: `rgb(255 255 255 / ${interpolate(0.1, 0, scrollProgress).toFixed(
      3,
    )})`,
    boxShadow: `0 ${Math.round(interpolate(28, 14, scrollProgress))}px ${Math.round(
      interpolate(80, 44, scrollProgress),
    )}px rgb(0 0 0 / ${interpolate(0.34, 0.1, scrollProgress).toFixed(3)})`,
    backdropFilter: `blur(${interpolate(24, 10, scrollProgress).toFixed(2)}px)`,
    WebkitBackdropFilter: `blur(${interpolate(24, 10, scrollProgress).toFixed(
      2,
    )}px)`,
    transform: `translateY(${interpolate(0, -2, scrollProgress).toFixed(2)}px)`,
  };
  const brandStyle = {
    transform: `scale(${interpolate(1, 0.97, scrollProgress).toFixed(3)})`,
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-[24px] pt-[18px] max-[640px]:px-[16px] max-[640px]:pt-[16px]">
        <div
          className="mx-auto flex w-full items-center justify-between gap-[18px] rounded-full border px-[20px] py-[12px] transition-[color] duration-200 ease-out max-[640px]:gap-[12px] max-[640px]:px-[16px] max-[640px]:py-[10px]"
          style={navShellStyle}
        >
          <Link
            className="inline-flex min-w-0 items-center gap-[12px] text-inherit no-underline"
            to="/"
          >
            <span
              className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border-brand-soft)] bg-[var(--color-fill-brand-muted)] shadow-[0_0_28px_rgba(255,120,200,0.18)] transition-transform duration-200 ease-out"
              style={brandStyle}
            >
              <img
                src="/logo.png"
                alt="QMee logo"
                className="h-[28px] w-[28px] object-contain"
              />
            </span>

            <span
              className={`truncate text-[18px] font-semibold tracking-[-0.04em] text-white transition-opacity duration-200 ${
                isCompact ? "opacity-90" : "opacity-100"
              }`}
            >
              QMee
            </span>
          </Link>

          <nav className="hidden items-center gap-[8px] lg:flex">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className={navLinkClassName}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-[10px] lg:flex">
            <Link to="/app" className={primaryCtaClassName}>
              Open chatbot
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[var(--color-surface-glass-strong)] text-white transition duration-200 hover:border-[color:var(--color-border-brand)] hover:bg-[var(--color-fill-brand-soft)] lg:hidden"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open navigation"
            aria-controls="mobile-navigation-drawer"
            aria-expanded={isDrawerOpen}
          >
            <Menu className="h-[20px] w-[20px]" />
          </button>
        </div>
      </header>

      {isDrawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/72 backdrop-blur-[6px]"
            aria-label="Close navigation"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div
            id="mobile-navigation-drawer"
            className="absolute right-[16px] top-[16px] flex w-[min(360px,calc(100%-32px))] flex-col gap-[18px] rounded-[32px] border border-[color:var(--color-border-subtle)] bg-[var(--color-surface-overlay-strong)] p-[18px] shadow-[0_32px_90px_rgba(0,0,0,0.52)] backdrop-blur-[26px]"
          >
            <div className="flex items-center justify-between gap-[12px]">
              <span className="text-[18px] font-semibold text-white">
                Navigation
              </span>

              <button
                type="button"
                className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[var(--color-surface-glass-strong)] text-white transition duration-200 hover:border-[color:var(--color-border-brand)] hover:bg-[var(--color-fill-brand-soft)]"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>

            <div className="flex flex-col gap-[8px]">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border-subtle)] bg-[var(--color-surface-glass-subtle)] px-[16px] py-[14px] text-[13px] font-semibold uppercase tracking-[0.18em] text-white/76 transition duration-200 hover:border-[color:var(--color-border-brand)] hover:bg-[var(--color-fill-brand-soft)] hover:text-white"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              to="/app"
              className={primaryCtaClassName}
              onClick={() => setIsDrawerOpen(false)}
            >
              Open chatbot
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
