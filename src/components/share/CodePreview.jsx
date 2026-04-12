import { Check, Copy, FileCode2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ShareActionButton from "./ShareActionButton";

const keywordTokens = new Set([
  "const",
  "return",
  "export",
  "default",
  "function",
  "if",
  "else",
  "for",
  "while",
  "map",
  "filter",
  "await",
  "async",
  "import",
  "from",
  "new",
  "class",
  "true",
  "false",
  "null",
  "let",
]);

const tokenPattern =
  /(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|<\/?[A-Za-z][\w-]*|\/?>|\b(?:const|return|export|default|function|if|else|for|while|map|filter|await|async|import|from|new|class|true|false|null|let)\b|\b\d+(?:\.\d+)?\b|[{}()[\].,;:+\-*/=<>]+)/g;

function getTokenType(token) {
  if (token.startsWith("//")) {
    return "comment";
  }

  if (/^["'`]/.test(token)) {
    return "string";
  }

  if (keywordTokens.has(token)) {
    return "keyword";
  }

  if (/^\d/.test(token)) {
    return "number";
  }

  if (/^<\/?[A-Za-z]/.test(token) || token === "/>" || token === ">") {
    return "tag";
  }

  if (/^[{}()[\].,;:+\-*/=<>]+$/.test(token)) {
    return "punctuation";
  }

  return "plain";
}

function tokenizeLine(line) {
  const fragments = [];
  let lastIndex = 0;

  line.replace(tokenPattern, (match, offset) => {
    if (offset > lastIndex) {
      fragments.push({
        text: line.slice(lastIndex, offset),
        type: "plain",
      });
    }

    fragments.push({
      text: match,
      type: getTokenType(match),
    });

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < line.length) {
    fragments.push({
      text: line.slice(lastIndex),
      type: "plain",
    });
  }

  return fragments.length > 0 ? fragments : [{ text: " ", type: "plain" }];
}

const tokenClasses = {
  plain: "text-white/82",
  keyword: "text-[var(--color-brand-accent-strong)]",
  string: "text-[var(--color-warning)]",
  number: "text-[var(--color-info-soft)]",
  punctuation: "text-white/52",
  comment: "text-white/44",
  tag: "text-[var(--color-info)]",
};

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
        "overflow-hidden rounded-[28px] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.2)]",
        className,
      )}
      style={{
        backgroundColor: "var(--color-surface-community-code)",
      }}
    >
      <div className="flex items-center justify-between gap-[12px] border-b border-[color:var(--color-border-muted)] bg-[rgb(255_255_255/0.06)] px-[16px] py-[14px]">
        <div className="flex min-w-0 items-center gap-[12px]">
          <span className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[color:var(--color-border-brand-faint)] bg-[var(--color-fill-brand-soft)] text-[var(--color-brand-accent)]">
            <FileCode2 className="h-[16px] w-[16px]" />
          </span>

          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold text-white">
              {filename}
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/46">
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
        <div className="select-none pr-[4px] text-right text-white/32">
          {lines.map((_, index) => (
            <div key={`line-number-${index + 1}`} className="min-h-[24px]">
              {index + 1}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          {lines.map((line, index) => (
            <div
              key={`code-line-${index + 1}`}
              className="min-h-[24px] whitespace-pre"
            >
              {tokenizeLine(line).map((token, tokenIndex) => (
                <span
                  key={`token-${index + 1}-${tokenIndex}`}
                  className={tokenClasses[token.type]}
                >
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
