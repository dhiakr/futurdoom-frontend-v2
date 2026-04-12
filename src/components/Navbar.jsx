import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const navItems = [
  { label: "Platform", to: "/platform" },
  { label: "Developers", to: "/developers" },
  { label: "Resources", to: "/resources" },
  { label: "Share", to: "/share" },
];

const navLinkClassName =
  "inline-flex items-center justify-center rounded-full px-[18px] py-[10px] text-[12px] font-semibold uppercase tracking-[0.2em] text-white/72 transition duration-200 hover:bg-[#ff78c8]/10 hover:text-white";

const primaryCtaClassName =
  "inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#ff78c8] px-[24px] py-[12px] text-[15px] font-semibold text-[#190410] no-underline shadow-[0_0_36px_rgba(255,120,200,0.28)] transition duration-200 hover:bg-[#ff99db] hover:shadow-[0_0_48px_rgba(255,120,200,0.38)]";

const secondaryCtaClassName =
  "inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-[22px] py-[12px] text-[15px] font-medium text-white/82 no-underline transition duration-200 hover:border-[#ff78c8]/35 hover:bg-[#ff78c8]/10 hover:text-white";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <>
      <header className="relative z-40 px-[24px] pt-[18px] max-[640px]:px-[16px] max-[640px]:pt-[16px]">
        <div className="mx-auto flex w-full max-w-[1340px] items-center justify-between gap-[18px] rounded-full border border-white/10 bg-black/30 px-[20px] py-[12px] shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-[24px]">
          <Link
            className="inline-flex min-w-0 items-center gap-[12px] text-inherit no-underline"
            to="/"
          >
            <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border border-[#ff78c8]/30 bg-[#ff78c8]/8 shadow-[0_0_28px_rgba(255,120,200,0.18)]">
              <img
                src="/logo.png"
                alt="QMee logo"
                className="h-[28px] w-[28px] object-contain"
              />
            </span>

            <span className="truncate text-[18px] font-semibold tracking-[-0.04em] text-white">
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
            className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition duration-200 hover:border-[#ff78c8]/35 hover:bg-[#ff78c8]/10 lg:hidden"
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
            className="absolute right-[16px] top-[16px] flex w-[min(360px,calc(100%-32px))] flex-col gap-[18px] rounded-[32px] border border-white/10 bg-[#0a0208]/94 p-[18px] shadow-[0_32px_90px_rgba(0,0,0,0.52)] backdrop-blur-[26px]"
          >
            <div className="flex items-center justify-between gap-[12px]">
              <span className="text-[18px] font-semibold text-white">
                Navigation
              </span>

              <button
                type="button"
                className="inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition duration-200 hover:border-[#ff78c8]/35 hover:bg-[#ff78c8]/10"
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
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-[16px] py-[14px] text-[13px] font-semibold uppercase tracking-[0.18em] text-white/76 transition duration-200 hover:border-[#ff78c8]/35 hover:bg-[#ff78c8]/10 hover:text-white"
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
