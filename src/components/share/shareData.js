const shareProfiles = {
  shiv: {
    name: "Maya Chen",
    handle: "@maya.makes",
    initials: "MC",
    verified: true,
    location: "Lisbon, Portugal",
    profession: "Community systems designer",
    followers: "18.4k",
    profileHref: "https://qmee.ai",
    profileNote:
      "Known for turning public prompts into reusable, readable AI threads.",
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
  },
  dipankar: {
    name: "Dipankar Porey",
    handle: "@dipankar.builds",
    initials: "DP",
    verified: true,
    location: "Kolkata, India",
    profession: "Founder exploring product positioning with AI",
    followers: "9.1k",
    profileHref: "https://qmee.ai",
    profileNote:
      "Shares early-stage product questions so other builders can reuse the prompts.",
    bio: "Dipankar uses public threads to pressure-test positioning and landing-page ideas before he commits them to product copy. His threads usually start with a practical product question and end with a clearer next action.",
    gradient: "var(--gradient-avatar-info)",
    avatarImage: "https://i.pravatar.cc/240?img=32",
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    socials: [
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
  },
  rina: {
    name: "Rina Solis",
    handle: "@rina.layouts",
    initials: "RS",
    verified: false,
    location: "Barcelona, Spain",
    profession: "Interface designer",
    followers: "7.8k",
    profileHref: "https://qmee.ai",
    profileNote:
      "Focuses on public AI interfaces that stay structured under real usage.",
    bio: "Rina experiments with layouts that let users read the original question, understand the AI response, and decide whether they want to continue privately. She shares design prompts to test hierarchy, balance, and readability.",
    gradient: "var(--gradient-avatar-info)",
    avatarImage: "https://i.pravatar.cc/240?img=32",
    coverImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    socials: [
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://instagram.com",
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
  },
  noah: {
    name: "Noah Idris",
    handle: "@noah.parsers",
    initials: "NI",
    verified: false,
    location: "Cairo, Egypt",
    profession: "Frontend engineer",
    followers: "6.5k",
    profileHref: "https://qmee.ai",
    profileNote:
      "Prefers lightweight implementation details over heavyweight UI chrome.",
    bio: "Noah shares implementation threads about code previews, parsers, and the practical tradeoffs involved in shipping AI product surfaces. He prefers simple interfaces with deliberate interactions.",
    gradient: "var(--gradient-avatar-warning)",
    avatarImage: "https://i.pravatar.cc/240?img=15",
    coverImage:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    socials: [
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
  },
  lena: {
    name: "Lena Park",
    handle: "@lena.motion",
    initials: "LP",
    verified: true,
    location: "Seoul, South Korea",
    profession: "Motion systems designer",
    followers: "12.2k",
    profileHref: "https://qmee.ai",
    profileNote:
      "Writes about interface feedback that helps people understand product structure.",
    bio: "Lena studies the small motions that make product hierarchy clearer without slowing down reading. Her shared threads usually cover hover states, feedback loops, and how motion supports intent instead of decoration.",
    gradient: "var(--gradient-avatar-success)",
    avatarImage: "https://i.pravatar.cc/240?img=20",
    coverImage:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    socials: [
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://instagram.com",
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
  },
};

function createUserMessage(id, profile, message) {
  return {
    id,
    authorType: "user",
    name: profile.name,
    initials: profile.initials,
    avatarImage: profile.avatarImage,
    gradient: profile.gradient,
    profile,
    ...message,
  };
}

export const featuredProfile = shareProfiles.shiv;

export const discussionThreads = [
  {
    id: "futurehub-positioning-thread",
    theme: {
      accentRgb: "var(--color-brand-primary-rgb)",
    },
    sectionLabel: "Share & Connect",
    dateLabel: "Feb 19, 2026",
    title:
      "How should a shared AI conversation turn into something people can adopt?",
    summary:
      "The public thread should show the original question, keep the AI response readable, and make the jump into a private chat feel immediate.",
    overview: ["2 conversations", "Readable AI reply", "Private handoff"],
    activity: ["14.2k views", "620 adoptions", "128 shares"],
    footerNote:
      "Open chat to adopt this conversation and continue it in your own workspace.",
    messages: [
      createUserMessage("futurehub-user", shareProfiles.dipankar, {
        timestamp: "Feb 19, 2026 - 10:30 AM",
        text: "Can you help me explain Futurehub on a shared page where people can read the conversation first, then continue it on their own if the answer is useful?",
      }),
      {
        id: "futurehub-ai",
        authorType: "ai",
        name: "QMee AI",
        meta: "AI response",
        timestamp: "Feb 19, 2026 - 10:31 AM",
        text: "Treat the page as a clean handoff surface. Show who asked the question, keep the prompt readable, and place the AI response directly underneath it so the conversation looks connected instead of detached.",
        callout:
          "Continue reading: make the answer skimmable first, then let people continue the full conversation in their own chat.",
      },
      createUserMessage("futurehub-follow-up", shareProfiles.dipankar, {
        timestamp: "Feb 19, 2026 - 10:33 AM",
        text: "What if the model does not recognize Futurehub yet? I still want the thread to be useful even if the product name is not found.",
      }),
      {
        id: "futurehub-ai-follow-up",
        authorType: "ai",
        name: "QMee AI",
        meta: "Follow-up",
        timestamp: "Feb 19, 2026 - 10:34 AM",
        text: "Say that directly: Futurehub is not found in my current context, so give me the product goal, the audience, and the outcome you want the landing page to drive. I can still help shape the narrative once those details are clear.",
        callout:
          "Next question: what should the first screen make people understand in five seconds?",
      },
    ],
  },
  {
    id: "code-preview-thread",
    theme: {
      accentRgb: "var(--color-glow-info-rgb)",
    },
    sectionLabel: "Community",
    dateLabel: "Mar 7, 2026",
    title:
      "What is the lightest way to preview AI code answers in public threads?",
    summary:
      "A small parser, line numbers, and a fast copy interaction are enough for preview mode. You do not need a full editor for this surface.",
    overview: ["Code parser", "Public answer", "Copy-ready preview"],
    activity: ["8.4k reads", "1.2k copies", "438 saves"],
    footerNote:
      "Continue this thread in chat if you want to refine the parser or expand the snippet.",
    messages: [
      createUserMessage("code-user", shareProfiles.noah, {
        timestamp: "Mar 7, 2026 - 9:58 AM",
        text: "I want code replies inside the community feed, but I do not want to ship a heavy editor just to show a few lines of syntax-highlighted output.",
      }),
      {
        id: "code-ai",
        authorType: "ai",
        name: "QMee AI",
        meta: "Code response",
        timestamp: "Mar 7, 2026 - 10:00 AM",
        text: "Use a lightweight tokenizer for the token families you actually need in preview mode. Pair it with a tight copy interaction and line numbers so the code feels deliberate instead of pasted in.",
        code: {
          filename: "tokenize-line.js",
          language: "js",
          content: `const pattern =
  /\\/\\/.*$|"(?:[^"\\\\]|\\\\.)*"|\\b(?:const|return|if)\\b|\\d+/g;

function tokenizeLine(line) {
  const tokens = [];
  let lastIndex = 0;
  pattern.lastIndex = 0;
  let match = pattern.exec(line);

  while (match) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), type: "plain" });
    }

    tokens.push({ text: match[0], type: classify(match[0]) });
    lastIndex = match.index + match[0].length;
    match = pattern.exec(line);
  }

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
    dateLabel: "Apr 11, 2026",
    title:
      "Which micro-interactions actually matter on a public AI discussion page?",
    summary:
      "The useful motion is the motion that explains hierarchy: subtle lifts, crisp button feedback, and clean reply nesting.",
    overview: ["UI detail", "Visible to everyone", "Subtle motion"],
    activity: ["6.1k views", "392 shares", "1.4k likes"],
    footerNote:
      "Take the thread into chat if you want to iterate on states, hover details, or button behavior.",
    messages: [
      createUserMessage("motion-user", shareProfiles.lena, {
        timestamp: "Apr 11, 2026 - 8:14 AM",
        text: "My public thread UI already looks clean, but it still feels static. What should I animate so it feels modern without becoming noisy?",
      }),
      {
        id: "motion-ai",
        authorType: "ai",
        name: "QMee AI",
        meta: "Design response",
        timestamp: "Apr 11, 2026 - 8:16 AM",
        text: "Animate the points of intent, not the whole page. Buttons can lift by one pixel, borders can brighten on hover, and reply cards can ease into place. Those small reactions make the surface feel alive while keeping the content as the main focus.",
        callout:
          "If the motion delays reading, it is decoration. If it helps people understand where to click or what belongs together, it is interface.",
      },
    ],
  },
];

