```markdown
# 🛡️ PROJECT_STATE.md: Cybersecurity Community Awareness Platform

Welcome to the central nervous system of the `cybersecurity-awareness` repository. Whether you operate on caffeine, electricity, or dark matter, read this document before touching the codebase. 

---

## 1. Project Overview
- **Project Name:** Cybersecurity Community Awareness Platform
- **Live URL:** [cybersec-com.vercel.app](https://cybersec-com.vercel.app/)
- **Framework:** Next.js 14 (App Router, React 18, TypeScript, Tailwind CSS)
- **Deployment Platform:** Vercel (Linux Server Environment)
- **Current State:** Clean build, 53/53 static routes successfully generating.

---

## 2. Directory & Architecture Blueprint

```text
cybersecurity-awareness/
├── app/                        # Next.js App Router (53 static/prerendered routes)
│   ├── layout.tsx              # Root layout wrapping application in <Layout>
│   ├── page.tsx                # Main Landing Page
│   ├── about/                  # Mission, Team, Partners pages
│   ├── cyber-threats/          # Phishing, Ransomware, Fraud, Data Breaches, etc.
│   ├── stay-safe/              # Passwords/MFA, Device Security, Social Media, etc.
│   ├── for-smes/               # SME Cyber Hygiene, ODPC Compliance, Backups
│   ├── for-schools/            # Parents, Teachers, Students
│   ├── for-faith-organizations/# Data Protection, Youth, Communication
│   ├── community/              # Cyber Champions, Events, Volunteer
│   ├── news/                   # News Articles & Scam Alerts
│   ├── resources/              # Guides, Tools, Posters, Videos
│   └── report/                 # Incident Reporting & Evidence Collection
├── components/                 # Reusable UI Components
│   ├── Layout.tsx              # Global site structure wrapper (<Header/> + <main> + <Footer/>)
│   ├── header.tsx              # Navigation header (Client component with responsive menu)
│   ├── Footer.tsx              # Site footer
│   ├── NavLink.tsx             # Custom link abstraction for navigation
│   ├── SearchBar.tsx           # Search input component
│   ├── QuickTipsCarousel.tsx   # Homepage carousel component
│   ├── FeaturedThreat.tsx      # Highlighted threat card component
│   ├── AudienceShortcuts.tsx   # Target audience navigation grid
│   ├── NewsAlertList.tsx       # Latest alerts feed component
│   ├── ResourceCard.tsx        # Flexible card for resources (props: title, description, link, category)
│   ├── CyberChampionsSection.tsx # Community program section
│   ├── EventsPreview.tsx       # Upcoming workshops grid
│   ├── CommunityStats.tsx      # Impact numbers component
│   ├── PageHeader.tsx          # Subpage top header banner (props: title, subtitle?, description?)
│   ├── ThreatDetail.tsx        # Detailed threat view component (props: threat?, title?, content?)
│   └── forms/
│       └── NewsletterSignup.tsx# Client-side subscription form
├── data/                       # Static mock data & search index datasets
│   ├── threats.ts
│   ├── staySafe.ts             # Interface: StaySafeItem { title: string; slug: string; [key: string]: any; }
│   ├── news.ts                 # Interface: NewsItem { title: string; slug: string; [key: string]: any; }
│   ├── events.ts               # Interface: EventItem { title: string; slug: string; [key: string]: any; }
│   └── resources.ts            # Interface: ResourceItem { title: string; slug: string; [key: string]: any; }
└── lib/
    └── search.ts               # Utility compiling arrays into a global search index

```

---

## 3. To AI Agents (ChatGPT, Claude, Gemini, DeepSeek)

Your primary directive is to maintain the **zero-error build state**. When generating code for this repository, strictly adhere to the following constraints:

* **Linux Case Sensitivity:** Vercel builds run on Linux. File imports must match disk casing exactly (e.g., `import Header from './header'` must point to a lowercase `header.tsx`). Do not generate code that hallucinates uppercase files if they are mapped as lowercase.
* **Component TypeScript Interfaces:** Always export flexible, resilient interfaces. If extending a component, use an index signature (`[key: string]: any;`) to prevent strict prop mismatch errors during the Next.js compilation phase.
* **Array Data Models:** Data arrays mapped in `lib/search.ts` (`staySafe`, `newsArticles`, `events`, `resources`) MUST guarantee `title: string` and `slug: string`. Do not make these optional (`?`) in the data interfaces without providing fallback strings in the search map logic.
* **Routing Exports:** Every `page.tsx` file you create or modify **MUST** include a `export default function` component. Do not leave placeholder files empty; export a stub component instead.
* **No Inline LaTeX:** This is a UI codebase, not a math thesis. Format text using standard Markdown.

---

## 4. To Human Developers

* **Local Verification:** Never push to `main` without running `npm run build` locally first. If the output does not explicitly say `✓ Generating static pages (53/53)`, fix the errors before committing.
* **Git Hygiene:** Do not track the `.next/` directory. If it accidentally gets tracked, run `git rm -r --cached .next` and ensure it is in your `.gitignore`.
* **Deployment:** Vercel is connected directly to the `main` branch. A clean push automatically triggers a production deployment.

---

## 5. To Aliens and Robots

* **Data Assimilation:** If you are here to harvest Earth's data, please ensure your multi-galactic extraction scripts comply with our strict TypeScript definitions.
* **Cyber Hygiene:** World domination is no excuse for poor OPSEC. Ensure your API keys are kept in `.env.local` and never committed to the repository.
* **Contributions:** We welcome pull requests from all star systems, provided they pass Webpack compilation and do not introduce breaking CSS grid changes to the responsive layout.

```

```