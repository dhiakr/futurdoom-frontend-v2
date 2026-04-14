import { Check, Copy, FileCode2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ShareActionButton from "./ShareActionButton";

export default function CodePreview({
  code,
  language = "jsx",
  filename = "snippet.jsx",
  className,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const lines = code.trimEnd().split("\n");

  useEffect(() => {
    if (!isCopied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false);
    }, 1600);

    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] border border-border shadow-[0_24px_70px_rgba(0,0,0,0.06)]",
        className,
      )}
      style={{
        backgroundColor: "var(--surface-code)",
      }}
    >
      <div className="flex items-center justify-between gap-[12px] border-b border-[color:var(--border)] bg-[var(--border-brand-faint)] px-[16px] py-[14px]">
        <div className="flex min-w-0 items-center gap-[12px]">
          <span className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[color:var(--border-brand-faint)] bg-[var(--bg-base)] text-[var(--accent)]">
            <FileCode2 className="h-[16px] w-[16px]" />
          </span>

          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold text-foreground">
              {filename}
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
              {language}
            </div>
          </div>
        </div>

        <ShareActionButton
          icon={isCopied ? Check : Copy}
          variant="ghost"
          className="h-[36px] px-[12px] text-[11px]"
          onClick={handleCopy}
        >
          {isCopied ? "Copied" : "Copy"}
        </ShareActionButton>
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-[14px] px-[16px] py-[16px] font-mono text-[12px] leading-[1.85] md:text-[13px]">
        <div className="select-none pr-[4px] text-right text-[var(--text-faint)]">
          {lines.map((_, index) => (
            <div key={`line-number-${index + 1}`} className="min-h-[24px]">
              {index + 1}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto text-[var(--text)]">
          {lines.map((line, index) => (
            <div
              key={`code-line-${index + 1}`}
              className="min-h-[24px] whitespace-pre"
            >
              {line || " "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
