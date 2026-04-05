import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowUp,
  Copy,
  Ellipsis,
  Menu,
  MessageSquareText,
  Paperclip,
  PencilLine,
  RefreshCcw,
  Search,
  Share2,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const chatSessions = [
  {
    id: "greeting-response",
    title: "Greeting Response",
    meta: "Today - 11:42",
    messages: [
      {
        role: "user",
        content: "helo",
      },
      {
        role: "assistant",
        thoughtLabel: "Thought for 1 second",
        thought:
          'We need to respond to "helo" which is likely a typo for "hello". Simple greeting response.',
        content: "Hello! How can I help you today?",
      },
    ],
  },
  {
    id: "email-rewrite",
    title: "Rewrite My Email",
    meta: "Today - 09:18",
    messages: [
      {
        role: "user",
        content: "Can you rewrite my email to sound more polite?",
      },
      {
        role: "assistant",
        thoughtLabel: "Thought for 2 seconds",
        thought:
          "The user wants a tone adjustment. Keep the meaning, make it polite, and keep the response short.",
        content:
          "Yes. Paste the draft here and I will rewrite it in a clearer and more polite tone.",
      },
    ],
  },
  {
    id: "study-plan",
    title: "Quick Study Plan",
    meta: "Yesterday - 20:05",
    messages: [
      {
        role: "user",
        content: "Build me a one-week study plan for calculus.",
      },
      {
        role: "assistant",
        thoughtLabel: "Thought for 3 seconds",
        thought:
          "This needs a compact revision schedule with focused topics and daily review. Keep it practical and easy to follow.",
        content:
          "Here is a simple 7-day plan:\n\nDay 1: derivative rules and 20 short exercises.\nDay 2: chain rule, implicit differentiation, and mixed practice.\nDay 3: integration basics, substitution, and correction review.\nDay 4: definite integrals and area questions.\nDay 5: word problems and interpretation of graphs.\nDay 6: timed mixed set under exam conditions.\nDay 7: error review, weak spots, and one final light revision pass.",
      },
    ],
  },
];

const starterPrompts = [
  "Summarize a meeting transcript",
  "Write a follow-up email",
  "Build a one-week study plan",
];

const controlButtonClassName =
  "inline-flex items-center justify-center rounded-full border border-white/10 bg-[#252529] text-white/70 transition duration-200 hover:border-[#ff78c8]/35 hover:text-white";

const actionButtonClassName =
  "inline-flex h-[32px] w-[32px] items-center justify-center rounded-full text-white/42 transition duration-200 hover:bg-white/[0.04] hover:text-[#ffb2e0]";

function groupSessionsByDate(sessions) {
  return sessions.reduce(
    (groups, session) => {
      if (session.meta.startsWith("Today")) {
        groups.Today.push(session);
      } else if (session.meta.startsWith("Yesterday")) {
        groups.Yesterday.push(session);
      } else {
        groups.Earlier.push(session);
      }

      return groups;
    },
    {
      Today: [],
      Yesterday: [],
      Earlier: [],
    },
  );
}

function ThreadComposer({ placeholder }) {
  return (
    <div className="mx-auto w-full max-w-[780px]">
      <div className="rounded-[22px] border border-white/8 bg-[#2a2a2f] px-[14px] py-[12px] shadow-[0_18px_50px_rgba(0,0,0,0.28)] md:rounded-[26px] md:px-[18px] md:py-[14px]">
        <label
          htmlFor="chat-message"
          className="block text-[13px] font-medium text-white/38"
        >
          {placeholder}
        </label>

        <textarea
          id="chat-message"
          rows="2"
          className="mt-[8px] min-h-[52px] w-full resize-none bg-transparent text-[15px] leading-[1.55] text-white outline-none placeholder:text-white/26 md:min-h-[68px] md:text-[16px]"
          placeholder="Type a message..."
        />

        <div className="mt-[10px] flex items-center justify-between gap-[10px] max-[560px]:flex-col max-[560px]:items-stretch">
          <div className="flex flex-wrap gap-[8px]">
            <button
              type="button"
              className="inline-flex min-h-[30px] items-center justify-center gap-[7px] rounded-full border border-[#ff78c8]/35 px-[12px] py-[6px] text-[13px] font-medium text-[#ffb2e0] transition duration-200 hover:bg-[#ff78c8]/10"
            >
              <MessageSquareText className="h-[13px] w-[13px]" />
              Deep Chat
            </button>

            <button
              type="button"
              className="inline-flex min-h-[30px] items-center justify-center gap-[7px] rounded-full border border-[#ff78c8]/35 px-[12px] py-[6px] text-[13px] font-medium text-[#ffb2e0] transition duration-200 hover:bg-[#ff78c8]/10"
            >
              <Search className="h-[13px] w-[13px]" />
              Search
            </button>
          </div>

          <div className="flex items-center justify-end gap-[8px]">
            <button
              type="button"
              className={cn(controlButtonClassName, "h-[36px] w-[36px]")}
              aria-label="Attach file"
            >
              <Paperclip className="h-[14px] w-[14px]" />
            </button>

            <button
              type="button"
              className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#43434c] text-[#ffb2e0] transition duration-200 hover:bg-[#ff78c8] hover:text-[#190410]"
              aria-label="Send message"
            >
              <ArrowUp className="h-[14px] w-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserMessage({ content }) {
  return (
    <div className="ml-auto flex max-w-[420px] flex-col items-end">
      <div className="rounded-full bg-[#2f2f34] px-[18px] py-[12px] text-[16px] font-medium text-white md:text-[17px]">
        {content}
      </div>

      <div className="mt-[8px] flex items-center gap-[6px]">
        <button
          type="button"
          className={actionButtonClassName}
          aria-label="Copy user message"
        >
          <Copy className="h-[14px] w-[14px]" />
        </button>
        <button
          type="button"
          className={actionButtonClassName}
          aria-label="Edit user message"
        >
          <PencilLine className="h-[14px] w-[14px]" />
        </button>
      </div>
    </div>
  );
}

function AssistantMessage({ thoughtLabel, thought, content }) {
  const paragraphs = content.split("\n\n");

  return (
    <div className="w-full max-w-[760px]">
      <div className="flex items-center gap-[8px] text-[13px] font-medium text-[#ffb2e0]">
        <MessageSquareText className="h-[14px] w-[14px]" />
        {thoughtLabel}
      </div>

      <ul className="mt-[12px] pl-[20px] text-[15px] leading-[1.75] text-white/78">
        <li>{thought}</li>
      </ul>

      <div className="mt-[14px] flex flex-col gap-[12px] text-[17px] font-medium leading-[1.7] text-white md:text-[18px]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="m-0 whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-[14px] flex flex-wrap gap-[6px]">
        <button
          type="button"
          className={actionButtonClassName}
          aria-label="Copy response"
        >
          <Copy className="h-[14px] w-[14px]" />
        </button>
        <button
          type="button"
          className={actionButtonClassName}
          aria-label="Regenerate response"
        >
          <RefreshCcw className="h-[14px] w-[14px]" />
        </button>
        <button
          type="button"
          className={actionButtonClassName}
          aria-label="Like response"
        >
          <ThumbsUp className="h-[14px] w-[14px]" />
        </button>
        <button
          type="button"
          className={actionButtonClassName}
          aria-label="Dislike response"
        >
          <ThumbsDown className="h-[14px] w-[14px]" />
        </button>
        <button
          type="button"
          className={actionButtonClassName}
          aria-label="Share response"
        >
          <Share2 className="h-[14px] w-[14px]" />
        </button>
      </div>
    </div>
  );
}

function HistorySidebar({
  groupedSessions,
  onNewChat,
  onSelectChat,
  selectedChatId,
  showCloseButton = false,
  onClose,
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-[12px] px-[4px]">
        <Link
          to="/"
          className="inline-flex items-center gap-[10px] text-inherit no-underline"
          aria-label="Go to home page"
        >
          <img
            src="/logo.png"
            alt="QMee logo"
            className="h-[28px] w-[28px] rounded-full object-contain"
          />
          <span className="text-[18px] font-semibold tracking-[-0.04em] text-[#ff9dd9]">
            QMee
          </span>
        </Link>

        {showCloseButton ? (
          <button
            type="button"
            className={cn(controlButtonClassName, "h-[32px] w-[32px]")}
            aria-label="Close history"
            onClick={onClose}
          >
            <X className="h-[15px] w-[15px]" />
          </button>
        ) : (
          <button
            type="button"
            className={cn(controlButtonClassName, "h-[30px] w-[30px]")}
            aria-label="Sidebar options"
          >
            <Ellipsis className="h-[14px] w-[14px]" />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onNewChat}
        className="mt-[22px] inline-flex min-h-[42px] items-center justify-center gap-[8px] rounded-full bg-[#3b3b43] px-[16px] py-[10px] text-[15px] font-medium text-white transition duration-200 hover:bg-[#474751]"
      >
        <PencilLine className="h-[15px] w-[15px]" />
        New chat
      </button>

      <div className="mt-[20px] flex flex-1 flex-col gap-[18px] overflow-y-auto pr-[2px]">
        {Object.entries(groupedSessions).map(([label, sessions]) =>
          sessions.length ? (
            <div key={label}>
              <p className="mb-[8px] px-[6px] text-[13px] font-medium text-white/42">
                {label}
              </p>

              <div className="space-y-[6px]">
                {sessions.map((item) => {
                  const isSelected = item.id === selectedChatId;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectChat(item.id)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-[16px] px-[12px] py-[11px] text-left text-[15px] font-medium transition duration-200",
                        isSelected
                          ? "bg-[#3a3a40] text-white"
                          : "text-white/76 hover:bg-[#26262b]",
                      )}
                    >
                      <span className="truncate">{item.title}</span>
                      <Ellipsis className="h-[14px] w-[14px] shrink-0 text-white/34" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null,
        )}
      </div>

      <div className="mt-[18px] flex items-center justify-between gap-[10px] rounded-[18px] bg-[#202025] px-[10px] py-[10px]">
        <div className="flex min-w-0 items-center gap-[10px]">
          <div className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#ff78c8] text-[13px] font-semibold text-[#190410]">
            Q
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate text-[14px] font-medium text-white/86">
              QMee User
            </p>
          </div>
        </div>

        <Ellipsis className="h-[16px] w-[16px] shrink-0 text-white/36" />
      </div>
    </div>
  );
}

export default function ChatbotPage() {
  const [selectedChatId, setSelectedChatId] = useState(chatSessions[0].id);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const selectedChat =
    chatSessions.find((item) => item.id === selectedChatId) || null;

  const groupedSessions = useMemo(
    () => groupSessionsByDate(chatSessions),
    [],
  );

  useEffect(() => {
    if (!isHistoryOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isHistoryOpen]);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    setIsHistoryOpen(false);
  };

  const handleNewChat = () => {
    setSelectedChatId(null);
    setIsHistoryOpen(false);
  };

  return (
    <main className="min-h-screen w-full bg-[#17171a] text-white xl:h-screen xl:overflow-hidden">
      <div className="grid min-h-screen w-full xl:h-full xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/8 bg-[#1c1c1f] px-[14px] py-[18px] xl:flex xl:h-full xl:min-h-0 xl:flex-col">
          <HistorySidebar
            groupedSessions={groupedSessions}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
          />
        </aside>

        {isHistoryOpen ? (
          <div className="fixed inset-0 z-50 xl:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/58"
              aria-label="Close history"
              onClick={() => setIsHistoryOpen(false)}
            />

            <div className="absolute left-0 top-0 h-full w-[min(300px,86vw)] border-r border-white/8 bg-[#1c1c1f] px-[14px] py-[18px] shadow-[20px_0_60px_rgba(0,0,0,0.36)]">
              <HistorySidebar
                groupedSessions={groupedSessions}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
                onClose={() => setIsHistoryOpen(false)}
                selectedChatId={selectedChatId}
                showCloseButton
              />
            </div>
          </div>
        ) : null}

        <section className="relative flex min-h-[100svh] flex-col bg-[#17171a] xl:h-full xl:min-h-0">
          <header className="grid grid-cols-[40px_minmax(0,1fr)_40px] items-center px-[16px] py-[14px] md:px-[24px] md:py-[20px]">
            <button
              type="button"
              className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full text-white/72 transition duration-200 hover:bg-white/[0.04] hover:text-white xl:pointer-events-none xl:opacity-0"
              aria-label="Open history"
              onClick={() => setIsHistoryOpen(true)}
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>

            <div className="min-w-0 text-center">
              <p className="m-0 truncate text-[15px] font-semibold text-white">
                {selectedChat ? selectedChat.title : "New chat"}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full text-white/72 transition duration-200 hover:bg-white/[0.04] hover:text-white"
              aria-label="Share chat"
            >
              <Share2 className="h-[15px] w-[15px]" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-[16px] pb-[166px] pt-[10px] md:px-[24px] md:pb-[182px]">
            {selectedChat ? (
              <div className="mx-auto flex min-h-[80svh] w-full max-w-[820px] flex-col gap-[34px] py-[4px] xl:min-h-0">
                {selectedChat.messages.map((message, index) =>
                  message.role === "user" ? (
                    <UserMessage
                      key={`${selectedChat.id}-message-${index}`}
                      content={message.content}
                    />
                  ) : (
                    <AssistantMessage
                      key={`${selectedChat.id}-message-${index}`}
                      thoughtLabel={message.thoughtLabel}
                      thought={message.thought}
                      content={message.content}
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="flex min-h-[80svh] items-center justify-center xl:min-h-0 xl:h-full">
                <div className="w-full max-w-[760px] text-center">
                  <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-[#ffb2e0]">
                    QMee AI
                  </p>
                  <h1 className="mt-[14px] text-[44px] font-semibold tracking-[-0.05em] text-white max-[640px]:text-[34px]">
                    How can I help?
                  </h1>
                  <p className="mx-auto mt-[14px] max-w-[560px] text-[16px] leading-[1.7] text-white/56">
                    Start a new thread for drafting, summarization, research,
                    or planning.
                  </p>

                  <div className="mt-[22px] flex flex-wrap justify-center gap-[10px]">
                    {starterPrompts.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="inline-flex min-h-[38px] items-center justify-center rounded-full border border-white/10 bg-[#232327] px-[14px] py-[8px] text-[14px] font-medium text-white/74 transition duration-200 hover:border-[#ff78c8]/35 hover:text-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(23,23,26,0)_0%,rgba(23,23,26,0.84)_22%,rgba(23,23,26,1)_100%)] px-[12px] pb-[14px] pt-[34px] md:px-[24px] md:pb-[22px] md:pt-[54px]">
            <div className="pointer-events-auto">
              <ThreadComposer placeholder="Message QMee" />
              <p className="mt-[8px] text-center text-[12px] text-white/28">
                AI-generated, for reference only
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
