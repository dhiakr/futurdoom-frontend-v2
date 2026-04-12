export const featuredProfile = {
  name: "Maya Chen",
  handle: "@maya.makes",
  initials: "MC",
  verified: true,
  location: "Lisbon, Portugal",
  profession: "Community systems designer",
  followers: "18.4k",
  profileHref: "https://qmee.ai",
  profileNote: "Known for turning public prompts into reusable, readable AI threads.",
  bio: "Maya curates public AI discussions that stay useful after the first reply. Her focus is structure: people should understand who asked, what the AI changed, and how to continue the conversation without the interface getting in the way.",
  gradient: "var(--gradient-avatar-featured)",
  avatarImage: "https://i.pravatar.cc/240?img=47",
  coverImage:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  socials: [
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://instagram.com",
    },
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      platform: "website",
      label: "Website",
      href: "https://qmee.ai",
    },
  ],
};

export const discussionThreads = [
  {
    id: "public-ai-layouts",
    theme: {
      accentRgb: "var(--color-brand-primary-rgb)",
    },
    sectionLabel: "General Discussion",
    title: "How should a public AI thread feel inside a real product?",
    summary:
      "The thread preview keeps the user prompt clear, the AI answer nested underneath it, and the handoff into the chatbot obvious.",
    overview: ["Community", "Updated 12 min ago", "Open to everyone"],
    activity: ["12.6k views", "118 replies", "410 continued in chat"],
    footerNote:
      "Open the chatbot to turn this public answer into a private working thread.",
    messages: [
      {
        id: "layout-user",
        authorType: "user",
        name: "Rina Solis",
        initials: "RS",
        avatarImage: "https://i.pravatar.cc/160?img=32",
        gradient: "var(--gradient-avatar-info)",
        timestamp: "Today, 10:30 AM",
        text: "I want a shared community page where anyone can see what users ask and what the AI replies, but I still need it to feel like a polished product instead of a random forum dump.",
        isOnline: true,
      },
      {
        id: "layout-ai",
        authorType: "ai",
        name: "QMee AI",
        meta: "AI response",
        timestamp: "Today, 10:31 AM",
        text: "Keep the page split into reusable layers: a profile rail for the person, a clean discussion surface for the prompt, and an inherited reply card for the AI. That keeps the thread readable without turning the screen into one oversized custom layout.",
        callout:
          "The reply should feel connected to the prompt, not detached from it. A nested structure with one level of indentation is enough.",
      },
      {
        id: "layout-follow-up",
        authorType: "user",
        name: "Rina Solis",
        initials: "RS",
        avatarImage: "https://i.pravatar.cc/160?img=32",
        gradient: "var(--gradient-avatar-info)",
        timestamp: "Today, 10:33 AM",
        text: "Should the profile card stay open all the time, or should I keep it compact and let people expand it only when they want the full context?",
      },
      {
        id: "layout-ai-follow-up",
        authorType: "ai",
        name: "QMee AI",
        meta: "Follow-up",
        timestamp: "Today, 10:34 AM",
        text: "Keep it compact in the rail. Show the essentials first, then use a lightweight popup for the full profile so the page stays balanced when the feed grows.",
      },
    ],
  },
  {
    id: "code-preview-thread",
    theme: {
      accentRgb: "var(--color-glow-info-rgb)",
    },
    sectionLabel: "Community",
    title: "What is the lightest way to preview AI code answers in public threads?",
    summary:
      "A small parser, line numbers, and a fast copy interaction are enough for preview mode. You do not need a full editor for this surface.",
    overview: ["Code Parser", "Updated 34 min ago", "Public answer"],
    activity: ["8.4k reads", "1.2k copies", "438 saves"],
    footerNote:
      "Continue this thread in the chatbot if you want to refine the parser or expand the snippet.",
    messages: [
      {
        id: "code-user",
        authorType: "user",
        name: "Noah Idris",
        initials: "NI",
        avatarImage: "https://i.pravatar.cc/160?img=15",
        gradient: "var(--gradient-avatar-warning)",
        timestamp: "Today, 9:58 AM",
        text: "I want code replies inside the community feed, but I do not want to ship a heavy editor just to show a few lines of syntax-highlighted output.",
      },
      {
        id: "code-ai",
        authorType: "ai",
        name: "QMee AI",
        meta: "Code response",
        timestamp: "Today, 10:00 AM",
        text: "Use a lightweight tokenizer for the token families you actually need in preview mode. Pair it with a tight copy interaction and line numbers so the code feels deliberate instead of pasted in.",
        code: {
          filename: "tokenize-line.js",
          language: "js",
          content: `const pattern =
  /(\\/\\/.*$|"(?:[^"\\\\]|\\\\.)*"|\\b(?:const|return|if)\\b|\\d+)/g;

function tokenizeLine(line) {
  const tokens = [];
  let lastIndex = 0;

  line.replace(pattern, (match, offset) => {
    if (offset > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, offset), type: "plain" });
    }

    tokens.push({ text: match, type: classify(match) });
    lastIndex = offset + match.length;
    return match;
  });

  return tokens;
}`,
        },
        callout:
          "The preview component stays reusable because it only solves for reading and copying, not editing.",
      },
    ],
  },
  {
    id: "micro-interactions-thread",
    theme: {
      accentRgb: "var(--color-glow-warm-rgb)",
    },
    sectionLabel: "General Discussion",
    title: "Which micro-interactions actually matter on a public AI discussion page?",
    summary:
      "The useful motion is the motion that explains hierarchy: subtle lifts, crisp button feedback, and clean reply nesting.",
    overview: ["UI Detail", "Updated 2 hr ago", "Visible to everyone"],
    activity: ["6.1k views", "392 shares", "1.4k likes"],
    footerNote:
      "Take the thread into the chatbot if you want to iterate on states, hover details, or button behavior.",
    messages: [
      {
        id: "motion-user",
        authorType: "user",
        name: "Lena Park",
        initials: "LP",
        avatarImage: "https://i.pravatar.cc/160?img=20",
        gradient: "var(--gradient-avatar-success)",
        timestamp: "Today, 8:14 AM",
        text: "My public thread UI already looks clean, but it still feels static. What should I animate so it feels modern without becoming noisy?",
      },
      {
        id: "motion-ai",
        authorType: "ai",
        name: "QMee AI",
        meta: "Design response",
        timestamp: "Today, 8:16 AM",
        text: "Animate the points of intent, not the whole page. Buttons can lift by one pixel, borders can brighten on hover, and reply cards can ease into place. Those small reactions make the surface feel alive while keeping the content as the main focus.",
        callout:
          "If the motion delays reading, it is decoration. If it helps people understand where to click or what belongs together, it is interface.",
      },
    ],
  },
];
