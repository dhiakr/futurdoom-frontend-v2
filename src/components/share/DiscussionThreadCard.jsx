import { ArrowRight, Bot, MessageSquareText } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import CodePreview from "./CodePreview";
import ShareAvatar from "./ShareAvatar";

function ThreadActivity({ items }) {
  return (
    <div className="mt-[12px] flex flex-wrap gap-x-[16px] gap-y-[6px] text-[13px] text-white/54">
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
          className="rounded-[26px] border px-[18px] py-[18px] shadow-[0_18px_42px_rgba(0,0,0,0.14)]"
          style={{
            borderColor: "rgb(var(--thread-accent-rgb) / 0.24)",
            background:
              "linear-gradient(180deg, rgb(var(--thread-accent-rgb) / 0.16), rgb(255 255 255 / 0.04))",
          }}
        >
          <div className="flex items-center gap-[10px] text-[13px] text-white/56">
            <span
              className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border"
              style={{
                borderColor: "rgb(var(--thread-accent-rgb) / 0.2)",
                backgroundColor: "rgb(var(--thread-accent-rgb) / 0.12)",
                color: "rgb(var(--thread-accent-rgb) / 0.92)",
              }}
            >
              <Bot className="h-[15px] w-[15px]" />
            </span>
            <div className="min-w-0">
              <p className="m-0 font-semibold text-white">{message.name}</p>
              <p className="m-0 mt-[2px] text-[12px] text-white/52">
                {message.meta} - {message.timestamp}
              </p>
            </div>
          </div>

          <p className="m-0 mt-[14px] text-[15px] leading-[1.8] text-white/82">
            {message.text}
          </p>

          {message.callout ? (
            <p className="m-0 mt-[12px] text-[14px] leading-[1.75] text-white/68">
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
    <div className="rounded-[26px] border border-white/12 bg-[rgb(255_255_255/0.05)] px-[18px] py-[18px] shadow-[0_18px_42px_rgba(0,0,0,0.12)]">
      <div className="flex items-start gap-[14px]">
        <ShareAvatar
          name={message.name}
          initials={message.initials}
          gradient={message.gradient}
          imageSrc={message.avatarImage}
          size="sm"
          shape="circle"
          showStatus={message.isOnline}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-[8px] text-[13px] text-white/54">
            <span className="font-semibold text-white">{message.name}</span>
            <span>{message.timestamp}</span>
          </div>

          <p className="m-0 mt-[10px] text-[15px] leading-[1.8] text-white/82">
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
      className="overflow-hidden rounded-[30px] border border-white/12 shadow-[0_28px_96px_rgba(0,0,0,0.22)] backdrop-blur-[24px] transition duration-300 hover:-translate-y-[2px]"
      style={{
        "--thread-accent-rgb": accentRgb,
        borderColor: "rgb(var(--thread-accent-rgb) / 0.18)",
        backgroundColor: "var(--color-surface-community-card)",
        backgroundImage:
          "linear-gradient(180deg, rgb(var(--thread-accent-rgb) / 0.14), rgb(255 255 255 / 0.04) 26%, transparent 42%)",
        boxShadow:
          "0 28px 96px rgba(0,0,0,0.22), inset 0 1px 0 rgb(255 255 255 / 0.04)",
      }}
    >
      <div
        aria-hidden="true"
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgb(var(--thread-accent-rgb) / 0.98), rgb(var(--thread-accent-rgb) / 0.36) 58%, transparent)",
        }}
      />

      <div className="border-b border-[color:var(--color-border-muted)] px-[22px] py-[20px]">
        <div
          className="inline-flex items-center gap-[8px] rounded-full border px-[12px] py-[8px] text-[12px] font-semibold uppercase tracking-[0.22em]"
          style={{
            borderColor: "rgb(var(--thread-accent-rgb) / 0.18)",
            backgroundColor: "rgb(var(--thread-accent-rgb) / 0.08)",
            color: "rgb(var(--thread-accent-rgb) / 0.94)",
          }}
        >
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] rounded-full"
            style={{ backgroundColor: "rgb(var(--thread-accent-rgb) / 0.94)" }}
          />
          {thread.sectionLabel}
        </div>

        <h3 className="m-0 mt-[10px] text-[clamp(1.5rem,3vw,2.15rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
          {thread.title}
        </h3>
        <p className="m-0 mt-[12px] max-w-[780px] text-[15px] leading-[1.8] text-white/70">
          {thread.summary}
        </p>
        <ThreadActivity items={thread.overview} />
      </div>

      <div className="space-y-[14px] px-[20px] py-[20px]">
        {thread.messages.map((message, index) => (
          <ConversationCard
            key={message.id}
            message={message}
            showThreadStats={index === 0}
            activity={thread.activity}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[14px] border-t border-[color:var(--color-border-muted)] px-[20px] py-[18px] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-[10px] text-[13px] text-white/58">
          <MessageSquareText
            className="h-[15px] w-[15px]"
            style={{ color: "rgb(var(--thread-accent-rgb) / 0.84)" }}
          />
          <span>{thread.footerNote}</span>
        </div>

        <Button asChild className="text-[13px] no-underline">
          <Link to="/app" state={{ sharedThread: thread }}>
            Continue in chatbot
            <ArrowRight className="h-[15px] w-[15px]" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
