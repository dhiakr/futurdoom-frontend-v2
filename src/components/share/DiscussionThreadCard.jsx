import { ArrowRight, Bot, MessageSquareText } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import CodePreview from "./CodePreview";
import ShareAvatar from "./ShareAvatar";

function ThreadActivity({ items }) {
  return (
    <div className="mt-[12px] flex flex-wrap gap-x-[16px] gap-y-[6px] text-[13px] text-muted-foreground">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-[8px]">
          <span
            aria-hidden="true"
            className="h-[6px] w-[6px] rounded-full"
            style={{ backgroundColor: "rgb(var(--thread-accent-rgb) / 0.78)" }}
          />
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}

function ConversationCard({ message, showThreadStats, activity }) {
  const isAi = message.authorType === "ai";

  if (isAi) {
    return (
      <div className="relative ml-[22px] pl-[18px] md:ml-[56px] md:pl-[24px]">
        <span
          aria-hidden="true"
          className="absolute bottom-[10px] left-0 top-[10px] w-px rounded-full"
          style={{
            background:
              "linear-gradient(180deg, rgb(var(--thread-accent-rgb) / 0), rgb(var(--thread-accent-rgb) / 0.58), rgb(var(--thread-accent-rgb) / 0))",
          }}
        />

        <div
          className="rounded-[16px] px-[24px] py-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
          style={{
            background:
              "linear-gradient(180deg, rgb(var(--thread-accent-rgb) / 0.08), rgb(255 255 255 / 0.72))",
          }}
        >
          <div className="flex items-center gap-[10px] text-[13px] text-muted-foreground">
            <span
              className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full"
              style={{
                backgroundColor: "rgb(var(--thread-accent-rgb) / 0.12)",
                color: "rgb(var(--thread-accent-rgb) / 0.92)",
              }}
            >
              <Bot className="h-[15px] w-[15px]" />
            </span>
            <div className="min-w-0">
              <p className="m-0 font-semibold text-foreground">
                {message.name}
              </p>
              <p className="m-0 mt-[2px] text-[12px] text-muted-foreground">
                {message.meta} - {message.timestamp}
              </p>
            </div>
          </div>

          <p className="m-0 mt-[14px] text-[15px] leading-[1.8] text-foreground opacity-90">
            {message.text}
          </p>

          {message.callout ? (
            <p className="m-0 mt-[12px] text-[14px] leading-[1.75] text-muted-foreground">
              {message.callout}
            </p>
          ) : null}

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

  return (
    <div className="rounded-[16px] border border-[color:var(--color-border-muted)] bg-[var(--color-surface-community-card-strong)] px-[24px] py-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
      <div className="flex items-start gap-[14px]">
        <ShareAvatar
          name={message.name}
          initials={message.initials}
          gradient={message.gradient}
          imageSrc={message.avatarImage}
          size="sm"
          shape="circle"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-[8px] text-[13px] text-muted-foreground">
            <span className="font-semibold text-foreground">
              {message.name}
            </span>
            <span>{message.timestamp}</span>
          </div>

          <p className="m-0 mt-[10px] text-[15px] leading-[1.8] text-foreground opacity-80">
            {message.text}
          </p>

          {showThreadStats ? <ThreadActivity items={activity} /> : null}
        </div>
      </div>
    </div>
  );
}

export default function DiscussionThreadCard({ thread }) {
  const accentRgb = thread.theme?.accentRgb ?? "var(--color-brand-primary-rgb)";

  return (
    <article
      className="overflow-hidden rounded-[20px] border border-[color:var(--color-border-muted)] bg-[var(--color-surface-community-card)] shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-[24px] transition duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_48px_rgba(0,0,0,0.05)]"
      style={{
        "--thread-accent-rgb": accentRgb,
      }}
    >
      <div
        aria-hidden="true"
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgb(var(--thread-accent-rgb) / 0.6), rgb(var(--thread-accent-rgb) / 0.1) 58%, transparent)",
        }}
      />

      <div className="border-b border-black/5 px-[28px] py-[24px]">
        <h3 className="m-0 mt-[10px] text-[clamp(1.5rem,3vw,2.15rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-foreground">
          {thread.title}
        </h3>
        <p className="m-0 mt-[12px] max-w-[780px] text-[16px] leading-[1.8] text-muted-foreground">
          {thread.summary}
        </p>
        <ThreadActivity items={thread.overview} />
      </div>

      <div className="space-y-[16px] px-[26px] py-[24px]">
        {thread.messages.map((message, index) => (
          <ConversationCard
            key={message.id}
            message={message}
            showThreadStats={index === 0}
            activity={thread.activity}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[14px] border-t border-black/5 bg-white/28 px-[26px] py-[20px] backdrop-blur-[18px] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-[10px] text-[13px] text-muted-foreground">
          <MessageSquareText
            className="h-[15px] w-[15px]"
            style={{ color: "rgb(var(--thread-accent-rgb) / 0.84)" }}
          />
          <span>{thread.footerNote}</span>
        </div>

        <Button asChild className="text-[13px] no-underline">
          <Link to="/app" state={{ sharedThread: thread }}>
            Continue in chat
            <ArrowRight className="h-[15px] w-[15px]" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
