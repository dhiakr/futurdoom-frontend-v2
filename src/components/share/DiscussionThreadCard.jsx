import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Bot, MessageSquareText, Share2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import CodePreview from "./CodePreview";
import ShareAvatar from "./ShareAvatar";

function MessageAuthor({ message, onOpenProfile }) {
  const hasProfile = Boolean(message.profile);

  return (
    <div className="flex items-start gap-[14px]">
      <ShareAvatar
        name={message.name}
        initials={message.initials}
        gradient={message.gradient}
        imageSrc={message.avatarImage}
        size="sm"
        shape="circle"
        interactive={hasProfile}
        ariaLabel={
          hasProfile ? `Open details for ${message.name}` : message.name
        }
        onClick={
          hasProfile ? () => onOpenProfile?.(message.profile) : undefined
        }
        className="shadow-none"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-[8px]">
          {hasProfile ? (
            <button
              type="button"
              className="cursor-pointer rounded-[10px] p-0 text-left text-[15px] font-medium text-foreground transition duration-200 hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              onClick={() => onOpenProfile?.(message.profile)}
            >
              {message.name}
            </button>
          ) : (
            <span className="text-[15px] font-medium text-foreground">
              {message.name}
            </span>
          )}

          {message.profile?.verified ? (
            <BadgeCheck className="h-[16px] w-[16px] text-[var(--primary)]" />
          ) : null}

          {message.profile?.handle ? (
            <span className="text-[13px] text-muted-foreground">
              {message.profile.handle}
            </span>
          ) : null}
        </div>

        <p className="m-0 mt-[4px] text-[12px] text-muted-foreground">
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}

function UserMessageCard({
  message,
  showThreadStats,
  activity,
  onOpenProfile,
  delay = 0,
}) {
  return (
    <div
      className="share-load-in-soft rounded-[28px] border border-[color:var(--border)] bg-[rgba(255,255,255,0.88)] px-[22px] py-[20px] shadow-[0_8px_24px_rgba(17,24,39,0.04)]"
      style={{ "--share-delay": `${delay}ms` }}
    >
      <MessageAuthor message={message} onOpenProfile={onOpenProfile} />

      <p className="m-0 mt-[14px] text-[15px] leading-[1.85] text-foreground">
        {message.text}
      </p>

      {showThreadStats ? (
        <div className="mt-[16px] flex flex-wrap gap-[10px] text-[12px] text-muted-foreground">
          {activity.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[color:var(--border)] bg-white px-[12px] py-[8px]"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AiMessageCard({ message, delay = 0 }) {
  return (
    <div
      className="share-load-in-soft pl-[18px] md:pl-[62px]"
      style={{ "--share-delay": `${delay}ms` }}
    >
      <div className="relative rounded-[28px] border bg-[rgb(255_248_252_/_0.92)] px-[22px] py-[20px] shadow-[0_10px_28px_rgba(255,120,200,0.08)]">
        <div
          aria-hidden="true"
          className="absolute bottom-[18px] left-[-18px] top-[18px] hidden w-px md:block"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgb(var(--thread-accent-rgb) / 0.22), transparent)",
          }}
        />

        <div className="flex items-start gap-[12px]">
          <span
            className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgb(var(--thread-accent-rgb) / 0.16)",
              color: "rgb(var(--thread-accent-rgb) / 0.94)",
            }}
          >
            <Bot className="h-[16px] w-[16px]" />
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-[8px]">
              <span className="text-[15px] font-medium text-foreground">
                {message.name}
              </span>
            </div>

            <p className="m-0 mt-[4px] text-[12px] text-muted-foreground">
              {message.timestamp}
            </p>
          </div>
        </div>

        <p className="m-0 mt-[14px] text-[15px] leading-[1.85] text-foreground">
          {message.text}
        </p>

        {message.code ? (
          <CodePreview
            className="mt-[16px]"
            code={message.code.content}
            filename={message.code.filename}
            language={message.code.language}
          />
        ) : null}
      </div>
    </div>
  );
}

export default function DiscussionThreadCard({
  thread,
  onOpenProfile,
  animationDelay = 0,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const messageCount = thread.messages.length;
  const messageLabel = `${messageCount} ${
    messageCount === 1 ? "message" : "messages"
  }`;

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false);
    }, 1600);

    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/share#${thread.id}`,
      );
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <article
      id={thread.id}
      className="share-load-in overflow-hidden rounded-[34px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,250,253,0.94))] shadow-[0_18px_46px_rgba(17,24,39,0.07)]"
      style={{
        "--thread-accent-rgb":
          thread.theme?.accentRgb ?? "var(--primary-rgb)",
        "--share-delay": `${animationDelay}ms`,
      }}
    >
      <div
        className="share-load-in-soft px-[28px] py-[26px] md:px-[34px] md:py-[30px]"
        style={{ "--share-delay": `${animationDelay + 60}ms` }}
      >
        <div className="flex flex-wrap items-start justify-between gap-[14px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-[10px] text-[12px]">
              <span className="rounded-full bg-[var(--fill-brand-faint)] px-[11px] py-[7px] font-medium uppercase tracking-[0.14em] text-[var(--tertiary)]">
                {thread.sectionLabel}
              </span>
              <span className="rounded-full bg-[var(--contrast-button)] px-[11px] py-[7px] font-medium text-muted-foreground">
                {thread.dateLabel}
              </span>
            </div>

            <h3
              className="m-0 mt-[16px] max-w-[700px] text-2xl font-semibold leading-[1.24] text-foreground"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                display: "-webkit-box",
                lineHeight: "32px",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {thread.title}
            </h3>
          </div>

          <div className="inline-flex items-center rounded-full bg-[var(--contrast-button)] px-[14px] py-[9px] text-[12px] font-medium text-muted-foreground">
            {messageLabel}
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,252,254,0.9))] px-[20px] py-[22px] md:px-[26px]">
        <div className="space-y-[16px]">
          {thread.messages.map((message, index) =>
            message.authorType === "ai" ? (
              <AiMessageCard
                key={message.id}
                message={message}
                delay={animationDelay + 120 + index * 70}
              />
            ) : (
              <UserMessageCard
                key={message.id}
                message={message}
                showThreadStats={index === 0}
                activity={thread.activity}
                onOpenProfile={onOpenProfile}
                delay={animationDelay + 120 + index * 70}
              />
            ),
          )}
        </div>
      </div>

      <div
        className="share-load-in-soft flex flex-col gap-[14px] border-t border-[color:var(--border)] px-[24px] py-[20px] md:flex-row md:items-center md:justify-between md:px-[30px]"
        style={{ "--share-delay": `${animationDelay + 220}ms` }}
      >
        <div className="flex items-center gap-[10px] text-[13px] text-muted-foreground">
          <MessageSquareText
            className="h-[15px] w-[15px]"
            style={{ color: "rgb(var(--thread-accent-rgb) / 0.84)" }}
          />
          <span>{thread.footerNote}</span>
        </div>

        <div className="flex flex-wrap gap-[10px]">
          <Button
            type="button"
            variant="outline"
            className="border-[color:var(--border)] bg-white text-foreground shadow-none hover:bg-[var(--contrast-button)]"
            onClick={handleShare}
          >
            <Share2 className="h-[15px] w-[15px]" />
            {isCopied ? "Link copied" : "Share"}
          </Button>

          <Button
            asChild
            className="bg-[var(--primary)] text-[13px] no-underline shadow-[0_16px_32px_rgba(255,120,200,0.22)] hover:bg-[var(--primary-hover)]"
          >
            <Link to="/app" state={{ sharedThread: thread }}>
              Continue This Conversation
              <ArrowRight className="h-[15px] w-[15px]" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
