import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import DiscussionThreadCard from "@/components/share/DiscussionThreadCard";
import ProfilePreviewDialog from "@/components/share/ProfilePreviewDialog";
import ProfileSpotlightCard from "@/components/share/ProfileSpotlightCard";
import {
  discussionThreads,
  featuredProfile,
} from "@/components/share/shareData";

export default function Share() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const totalConversations = discussionThreads.reduce(
    (count, thread) =>
      count +
      thread.messages.filter((message) => message.authorType === "user").length,
    0,
  );

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #fffdfd 0%, #fff7fb 30%, #fff0f7 100%)",
          }}
        />
        <div
          className="absolute left-[-8%] top-[8%] h-[260px] w-[260px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-brand-primary-rgb) / 0.12) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute right-[-4%] top-[18%] h-[320px] w-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-glow-info-rgb) / 0.08) 0%, transparent 74%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[28%] h-[280px] w-[280px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--color-brand-accent-rgb) / 0.12) 0%, transparent 74%)",
          }}
        />
      </div>

      <main className="relative z-10 px-[20px] pb-[72px] pt-[24px] max-[640px]:px-[16px] max-[640px]:pb-[52px]">
        <section className="mx-auto w-full max-w-[1460px]">
          <div className="grid gap-[24px] lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
            <aside className="relative z-20 lg:sticky lg:top-[112px] lg:self-start">
              <ProfileSpotlightCard profile={featuredProfile} />
            </aside>

            <div className="relative z-10 space-y-[24px]">
              <header
                className="share-load-in rounded-[24px] border border-[color:var(--color-border-muted)] bg-[var(--color-surface-base)] px-[18px] py-[16px] shadow-[0_14px_34px_rgba(49,12,34,0.05)] md:px-[22px]"
                style={{ "--share-delay": "80ms" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-[14px]">
                  <div className="flex min-w-0 items-center gap-[12px]">
                    <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[var(--color-fill-brand-faint)] text-[var(--color-brand-primary-foreground-strong)]">
                      <MessageSquareText className="h-[16px] w-[16px]" />
                    </span>

                    <div className="min-w-0">
                      <p className="m-0 text-[15px] font-semibold tracking-[-0.03em] text-foreground">
                        Community feed
                      </p>
                      <p className="m-0 mt-[3px] text-[13px] text-muted-foreground">
                        Read shared prompts, AI replies, and continue in chat.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-[8px]">
                    <div className="rounded-full border border-[color:var(--color-border-muted)] bg-[var(--color-surface-contrast-button)] px-[12px] py-[8px] text-[12px] font-medium text-foreground">
                      {discussionThreads.length} threads
                    </div>
                    <div className="rounded-full border border-[color:var(--color-border-muted)] bg-white px-[12px] py-[8px] text-[12px] font-medium text-muted-foreground">
                      {totalConversations} conversations
                    </div>
                  </div>
                </div>
              </header>

              {discussionThreads.map((thread, index) => (
                <DiscussionThreadCard
                  key={thread.id}
                  thread={thread}
                  onOpenProfile={setSelectedProfile}
                  animationDelay={140 + index * 90}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <ProfilePreviewDialog
        profile={selectedProfile}
        open={Boolean(selectedProfile)}
        onClose={() => setSelectedProfile(null)}
      />
    </>
  );
}
