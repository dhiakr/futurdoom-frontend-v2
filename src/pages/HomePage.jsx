import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const primaryButtonClassName =
  "inline-flex min-h-[56px] items-center justify-center gap-[10px] rounded-full bg-[#ff78c8] px-[28px] py-[14px] text-[16px] font-semibold text-[#190410] no-underline shadow-[0_0_42px_rgba(255,120,200,0.32)] transition duration-200 hover:bg-[#ff99db] hover:shadow-[0_0_56px_rgba(255,120,200,0.42)]";

export default function HomePage() {
  return (
    <>
      <BackgroundGradientAnimation
        interactive
        className="hidden"
        containerClassName="fixed inset-0 z-0 min-h-0"
        gradientBackgroundStart="rgb(6, 1, 5)"
        gradientBackgroundEnd="rgb(32, 3, 24)"
        firstColor="255, 120, 200"
        secondColor="124, 20, 86"
        thirdColor="255, 194, 233"
        fourthColor="70, 8, 51"
        fifthColor="255, 222, 242"
        pointerColor="255, 166, 223"
        blendingValue="screen"
        size="82%"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.86)_18%,rgba(15,2,11,0.7)_46%,rgba(52,6,39,0.3)_100%)]" />
        <div className="absolute left-1/2 top-[2%] h-[220px] w-[56%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle,rgba(255,158,76,0.3)_0%,rgba(255,158,76,0.18)_32%,transparent_70%)] blur-[80px]" />
        <div className="absolute left-1/2 top-[18%] h-[420px] w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle,rgba(168,188,255,0.22)_0%,rgba(255,175,228,0.18)_28%,transparent_72%)] blur-[110px]" />
        <div className="absolute left-1/2 top-[55%] h-[380px] w-[48%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle,rgba(255,198,232,0.2)_0%,rgba(255,120,200,0.08)_42%,transparent_72%)] blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-1 items-center justify-center px-[24px] pb-[72px] pt-[34px] max-[640px]:px-[16px] max-[640px]:pb-[48px]">
        <section className="flex min-h-[calc(100vh-220px)] w-full max-w-[1040px] items-center justify-center">
          <div className="w-full text-center">
            <div className="mx-auto flex max-w-[320px] items-center justify-center gap-[18px] text-white/44">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/28" />
              <span className="text-[28px] leading-none text-[#ffc7ea]">
                QMee
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/28" />
            </div>

            <div className="mx-auto mt-[20px] inline-flex items-center gap-[10px] px-[18px] py-[10px] ">
              <img
                src="/logo.png"
                alt="QMee logo"
                className="h-[100px] w-[100px] object-contain"
              />
            </div>

            <h1 className="mx-auto mt-[28px] max-w-[720px] text-[clamp(3rem,8vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
              AI for clear work,
              <br />
              built to move fast
            </h1>

            <p className="mx-auto mt-[22px] max-w-[600px] text-[clamp(1rem,2.4vw,1.4rem)] font-medium leading-[1.7] text-white/68">
              QMee is a simple AI chatbot. Open the chat and start talking.
            </p>

            <div className="mt-[34px] flex items-center justify-center">
              <Link to="/app" className={primaryButtonClassName}>
                Open chatbot
                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
