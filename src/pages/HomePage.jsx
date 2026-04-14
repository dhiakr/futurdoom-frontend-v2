import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const primaryButtonClassName =
  "inline-flex min-h-[56px] items-center justify-center gap-[10px] rounded-full bg-[var(--primary)] px-[28px] py-[14px] text-[16px] font-semibold text-[var(--text-on-primary)] no-underline shadow-[0_0_42px_rgba(255,120,200,0.32)] transition duration-200 hover:bg-[var(--primary-hover)] hover:shadow-[0_0_56px_rgba(255,120,200,0.42)]";

export default function HomePage() {
  return (
    <>
      <BackgroundGradientAnimation
        interactive
        className="hidden"
        containerClassName="fixed inset-0 z-0 min-h-0"
        gradientBackgroundStart="var(--gradient-start)"
        gradientBackgroundEnd="var(--gradient-end)"
        firstColor="var(--primary-rgb)"
        secondColor="var(--tertiary-rgb)"
        thirdColor="var(--accent-rgb)"
        fourthColor="var(--shadow-rgb)"
        fifthColor="var(--light-rgb)"
        pointerColor="var(--pointer-rgb)"
        blendingValue="screen"
        size="82%"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-home-overlay)" }}
        />
        <div
          className="absolute left-1/2 top-[2%] h-[220px] w-[56%] -translate-x-1/2 rounded-[999px] blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--glow-warm-rgb) / 0.3) 0%, rgb(var(--glow-warm-rgb) / 0.18) 32%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[18%] h-[420px] w-[70%] -translate-x-1/2 rounded-[50%] blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--glow-cool-rgb) / 0.22) 0%, rgb(var(--glow-accent-rgb) / 0.18) 28%, transparent 72%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[55%] h-[380px] w-[48%] -translate-x-1/2 rounded-[50%] blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--accent-rgb) / 0.2) 0%, rgb(var(--primary-rgb) / 0.08) 42%, transparent 72%)",
          }}
        />
      </div>

      <main className="relative z-10 flex flex-1 items-center justify-center px-[24px] pb-[72px] pt-[34px] max-[640px]:px-[16px] max-[640px]:pb-[48px]">
        <section className="flex min-h-[calc(100vh-220px)] w-full max-w-[1040px] items-center justify-center">
          <div className="w-full text-center">
            <div className="mx-auto flex max-w-[320px] items-center justify-center gap-[18px] text-muted-foreground">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
              <span className="text-[28px] leading-none text-[var(--primary)]">
                QMee
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
            </div>

            <div className="mx-auto mt-[20px] inline-flex items-center gap-[10px] px-[18px] py-[10px] ">
              <img
                src="/logo.png"
                alt="QMee logo"
                className="h-[100px] w-[100px] object-contain"
              />
            </div>

            <h1 className="mx-auto mt-[28px] max-w-[720px] text-[clamp(3rem,8vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-foreground">
              AI for clear work,
              <br />
              built to move fast
            </h1>

            <p className="mx-auto mt-[22px] max-w-[600px] text-[clamp(1rem,2.4vw,1.4rem)] font-medium leading-[1.7] text-muted-foreground">
              QMee is a focused AI workspace for drafting, research, and quick
              problem-solving.
            </p>

            <div className="mt-[34px] flex items-center justify-center">
              <Link to="/app" className={primaryButtonClassName}>
                Open chat
                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
