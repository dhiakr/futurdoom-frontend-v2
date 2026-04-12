import { MessageSquareText } from "lucide-react";
import DiscussionThreadCard from "@/components/share/DiscussionThreadCard";
import ProfileSpotlightCard from "@/components/share/ProfileSpotlightCard";
import {
  discussionThreads,
  featuredProfile,
} from "@/components/share/shareData";

export default function Share() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-share-overlay)" }}
        />
        <div
          className="absolute left-1/2 top-[8%] h-[220px] w-[52%] -translate-x-1/2 rounded-[999px] blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-brand-primary-rgb) / 0.16) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute right-[10%] top-[24%] h-[240px] w-[240px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-glow-info-rgb) / 0.14) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute left-[8%] top-[42%] h-[260px] w-[260px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-brand-accent-rgb) / 0.1) 0%, transparent 72%)",
          }}
        />
      </div>

      <main className="relative z-10 px-[24px] pb-[72px] pt-[20px] max-[640px]:px-[16px] max-[640px]:pb-[48px]">
        <section className="mx-auto w-full max-w-[1320px]">
          <div
            id="community-feed"
            className="grid gap-[20px] xl:grid-cols-[320px_minmax(0,1fr)]"
          >
            <aside className="relative z-20 xl:sticky xl:top-[118px] xl:self-start">
              <ProfileSpotlightCard profile={featuredProfile} />
            </aside>

            <div className="relative z-10 space-y-[18px]">
              <div
                className="relative overflow-hidden rounded-[24px] px-[18px] py-[16px] shadow-[0_24px_70px_rgba(255,120,200,0.32)]"
                style={{
                  backgroundColor: "var(--color-brand-primary)",
                  backgroundImage:
                    "linear-gradient(180deg, rgb(255 255 255 / 0.08), rgb(255 255 255 / 0) 55%)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgb(255 255 255 / 0.16), transparent 32%), radial-gradient(circle at bottom left, rgb(255 255 255 / 0.06), transparent 38%)",
                  }}
                />

                <div className="relative flex flex-wrap items-center justify-between gap-[12px]">
                  <div className="flex items-center gap-[12px]">
                    <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-black/10 bg-white/24 text-[var(--color-text-on-brand-strong)] shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                      <MessageSquareText className="h-[16px] w-[16px]" />
                    </span>

                    <div>
                      <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:rgb(23_3_15/0.62)]">
                        Discussion Board
                      </p>
                      <p className="m-0 mt-[4px] text-[15px] font-semibold text-[var(--color-text-on-brand-strong)]">
                        Public threads anyone can read and continue.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-black/10 bg-white/22 px-[12px] py-[8px] text-[12px] font-semibold text-[var(--color-text-on-brand-strong)]">
                    {discussionThreads.length} live threads
                  </div>
                </div>
              </div>

              {discussionThreads.map((thread) => (
                <DiscussionThreadCard key={thread.id} thread={thread} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
