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
              "radial-gradient(circle, rgb(var(--color-brand-primary-rgb) / 0.2) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute right-[10%] top-[24%] h-[240px] w-[240px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-glow-info-rgb) / 0.16) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute left-[8%] top-[42%] h-[260px] w-[260px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-brand-accent-rgb) / 0.12) 0%, transparent 72%)",
          }}
        />
      </div>

      <main className="relative z-10 px-[24px] pb-[72px] pt-[20px] max-[640px]:px-[16px] max-[640px]:pb-[48px]">
        <section className="mx-auto w-full max-w-[1700px]">
          <div className="grid gap-[24px] lg:grid-cols-[280px_minmax(0,1fr)_280px] xl:grid-cols-[300px_minmax(0,1fr)_300px]">
            <aside className="relative z-20 lg:sticky lg:top-[118px] lg:self-start">
              <ProfileSpotlightCard profile={featuredProfile} />
            </aside>

            <div className="relative z-10 space-y-[18px]">
              <div className="flex flex-wrap items-center justify-between gap-[12px] rounded-[20px] border border-[color:var(--color-border-brand-soft)] bg-[var(--color-fill-brand-soft)] px-[24px] py-[22px] shadow-[0_12px_32px_rgba(255,120,200,0.08)]">
                <div className="flex flex-wrap items-center justify-between gap-[12px] w-full">
                  <div className="flex items-center gap-[12px]">
                    <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[color:var(--color-border-brand-subtle)] bg-white text-[var(--color-brand-primary-foreground-strong)] shadow-[0_8px_18px_rgba(255,120,200,0.08)]">
                      <MessageSquareText className="h-[16px] w-[16px]" />
                    </span>

                    <div>
                      <p className="m-0 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-primary-foreground-strong)] opacity-60">
                        Community Threads
                      </p>
                      <p className="m-0 mt-[4px] text-[15px] font-semibold text-[var(--color-brand-primary-foreground-strong)]">
                        Public threads people can read, save, and continue in
                        chat.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-[color:var(--color-border-brand-subtle)] bg-white/80 px-[12px] py-[8px] text-[12px] font-semibold text-[var(--color-brand-primary-foreground-strong)]">
                    {discussionThreads.length} threads
                  </div>
                </div>
              </div>

              {discussionThreads.map((thread) => (
                <DiscussionThreadCard key={thread.id} thread={thread} />
              ))}
            </div>

            <aside className="relative z-20 hidden lg:block lg:sticky lg:top-[118px] lg:self-start" />
          </div>
        </section>
      </main>
    </>
  );
}
