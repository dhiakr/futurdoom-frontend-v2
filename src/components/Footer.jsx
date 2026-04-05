import { Mail } from "lucide-react";
import { Link } from "react-router";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.68c-2.77.6-3.35-1.18-3.35-1.18-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.31 1.08 2.87.82.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.11-4.54-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.84c.85 0 1.71.11 2.51.34 1.9-1.29 2.74-1.02 2.74-1.02.56 1.39.21 2.42.11 2.67.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.67-4.57 4.92.36.31.67.92.67 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.4a1.56 1.56 0 0 1 0 3.12ZM5.6 9.67h2.67V18H5.6V9.67Zm4.35 0h2.56v1.14h.04c.36-.68 1.23-1.4 2.53-1.4 2.7 0 3.2 1.78 3.2 4.09V18h-2.67v-3.99c0-.95-.02-2.17-1.32-2.17-1.33 0-1.53 1.03-1.53 2.1V18H9.95V9.67Z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M18.9 3H21l-4.58 5.24L21.8 21h-4.22l-3.3-4.67L10.2 21H8.1l4.9-5.6L2.8 3H7.1l2.98 4.22L13.8 3h2.1l-4.55 5.2L18.9 3Zm-1.48 15.98h1.17L6.46 4.92H5.2l12.22 14.06Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Email", href: "mailto:hello@qmee.ai", icon: Mail },
];

const footerColumns = [
  {
    title: "Platform",
    items: [
      "Chatbot Workspace",
      "Drafting Tools",
      "Conversation History",
      "Prompt Actions",
    ],
  },
  {
    title: "Solutions",
    items: [
      "Writers",
      "Researchers",
      "Students",
      "Support Teams",
    ],
  },
  {
    title: "News & Insights",
    items: [
      "Blog",
      "Resources",
      "Guides",
      "Updates",
    ],
  },
  {
    title: "About Us",
    items: [
      "Company",
      "Culture",
      "Careers",
    ],
  },
];

const legalLinks = [
  "Copyright & IP Policy",
  "Legal",
  "Privacy",
  "Cookie Policy",
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto px-[24px] pb-[24px] max-[640px]:px-[16px] max-[640px]:pb-[16px]">
      <div className="relative mx-auto overflow-hidden rounded-[34px] border border-white/10 bg-[#050205]/96 px-[28px] py-[28px] shadow-[0_32px_100px_rgba(0,0,0,0.38)] backdrop-blur-[24px] max-[640px]:px-[20px] max-[640px]:py-[22px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-full bg-[radial-gradient(circle_at_top_left,rgba(255,120,200,0.14),transparent_36%),repeating-linear-gradient(-32deg,transparent_0_28px,rgba(255,120,200,0.1)_28px_32px)] opacity-60 lg:block"
        />

        <div className="relative grid gap-[28px] lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
          <section className="max-w-[280px]">
            <Link
              to="/"
              className="inline-flex items-center gap-[12px] text-inherit no-underline"
            >
              <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#ff78c8]/28 bg-[#ff78c8]/8 shadow-[0_0_28px_rgba(255,120,200,0.18)]">
                <img
                  src="/logo.png"
                  alt="QMee logo"
                  className="h-[30px] w-[30px] object-contain"
                />
              </span>

              <span className="text-[20px] font-semibold tracking-[-0.04em] text-white">
                QMee
              </span>
            </Link>

            <div className="mt-[22px] space-y-[2px] text-[15px] leading-[1.45] text-white/82">
              <p className="m-0">Lisbon HQ</p>
              <p className="m-0">Support Live 24/6</p>
              <p className="m-0">hello@qmee.ai</p>
            </div>

            <div className="mt-[20px] flex flex-col items-start gap-[10px] text-[15px] font-medium">
              <a
                href="mailto:hello@qmee.ai"
                className="text-[#ff78c8] no-underline transition duration-200 hover:text-[#ff99db]"
              >
                Contact Us
              </a>
              <Link
                to="/app"
                className="text-[#ff78c8] no-underline transition duration-200 hover:text-[#ff99db]"
              >
                Open Chatbot
              </Link>
              <a
                href="tel:+3512055550142"
                className="text-[#ff78c8] no-underline transition duration-200 hover:text-[#ff99db]"
              >
                +351 20 5555 0142
              </a>
            </div>

            <div className="mt-[18px] flex flex-wrap gap-[10px]">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,rgba(255,120,200,0.24),rgba(255,120,200,0.08))] text-[#ff99db] shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition duration-200 hover:bg-[linear-gradient(180deg,rgba(255,153,219,0.3),rgba(255,120,200,0.14))] hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </section>

          {footerColumns.map((column) => (
            <section key={column.title}>
              <h3 className="m-0 text-[15px] font-medium text-white/48">
                {column.title}
              </h3>

              <div className="mt-[26px] flex flex-col gap-[10px]">
                {column.items.map((item) => (
                  <span
                    key={item}
                    className="text-[15px] font-medium leading-[1.25] text-white/92"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="relative mt-[34px] flex flex-col gap-[14px] border-t border-white/8 pt-[20px] text-[14px] text-white/42 lg:flex-row lg:items-center lg:justify-between">
          <span>{new Date().getFullYear()} QMee. All rights reserved.</span>

          <div className="flex flex-wrap gap-x-[22px] gap-y-[8px]">
            {legalLinks.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <span>Site by QMee</span>
        </div>
      </div>
    </footer>
  );
}
