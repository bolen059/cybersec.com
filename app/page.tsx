// app/page.tsx
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Building2,
  GraduationCap,
  Users,
  Calendar,
  ArrowRight,
  Bell,
  FileText,
  Play,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

// Data imports
import { threats } from '@/data/threats';
import { staySafe } from '@/data/staySafe';
import { resources } from '@/data/resources';
import { events } from '@/data/events';
import { newsArticles } from '@/data/news';
import NewsletterForm from '@/components/NewsletterForm';

export default function HomePage() {
  // Take top items for homepage highlights
  const featuredThreat = threats?.[0] || {
    title: 'Mobile Money Fraud & SIM Swapping',
    slug: 'mobile-money-fraud',
    summary: 'Fraudsters impersonating network agents or senders to trick users into approving transactions or giving out PINs.',
    category: 'Critical Alert',
    impactLevel: 'High',
  };

  const quickTips = staySafe?.slice(0, 3) || [];
  const latestAlerts = newsArticles?.slice(0, 3) || [];
  const featuredResourcesList = resources?.slice(0, 3) || [];
  const upcomingEvents = events?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300">
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>Community Cyber Safety & Data Protection Awareness</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Protect Yourself. <span className="text-teal-400">Protect Your Data.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
            Empowering citizens, small businesses, schools, and faith communities across Kenya with practical, plain-English cybersecurity tools and ODPC compliance guides.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/stay-safe"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400"
            >
              <ShieldCheck className="h-4 w-4" />
              Learn Safety Guides
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
            >
              <ShieldAlert className="h-4 w-4 text-red-400" />
              Report an Incident
            </Link>
            <Link
              href="/community/cyber-champions"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400"
            >
              <Users className="h-4 w-4 text-teal-400" />
              Join as Champion
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 space-y-20">
        {/* 2. QUICK CYBERSECURITY TIPS */}
        <section aria-labelledby="quick-tips-heading">
          <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 id="quick-tips-heading" className="text-2xl font-bold text-white flex items-center gap-2">
                <Lock className="h-6 w-6 text-teal-400" />
                Quick Cybersecurity Tips
              </h2>
              <p className="mt-1 text-sm text-slate-400">Essential habits to safeguard your personal accounts and finances.</p>
            </div>
            <Link href="/stay-safe" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal-400 hover:text-teal-300">
              View all guides <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickTips.map((item, index) => (
              <div key={item.slug || index} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <span className="inline-block rounded bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 text-xs font-semibold text-teal-300 mb-3">
                    {item.category || 'Core Habit'}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">{item.summary || item.description}</p>
                </div>
                <Link
                  href={item.route || `/stay-safe/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:underline"
                >
                  Read tip guide <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 3. LATEST CYBERSECURITY ALERTS */}
        <section aria-labelledby="alerts-heading">
          <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 id="alerts-heading" className="text-2xl font-bold text-white flex items-center gap-2">
                <Bell className="h-6 w-6 text-amber-400" />
                Latest Cybersecurity Alerts
              </h2>
              <p className="mt-1 text-sm text-slate-400">Real-time threat vectors currently circulating in the region.</p>
            </div>
            <Link href="/news" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300">
              News & Alerts Hub <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestAlerts.map((article, index) => (
              <div key={article.slug || index} className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-300 border border-amber-500/30">
                      {article.category || 'Alert'}
                    </span>
                    {article.date && <span className="text-xs text-slate-500">{article.date}</span>}
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 mb-2">{article.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{article.summary}</p>
                </div>
                <Link
                  href={article.route || `/news/${article.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:underline"
                >
                  Read full alert <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FEATURED CYBER THREAT SPOTLIGHT */}
        <section aria-labelledby="featured-threat-heading" className="rounded-2xl border border-red-900/40 bg-gradient-to-r from-red-950/20 via-slate-900 to-slate-900 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 mb-4">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Featured Threat Spotlight</span>
              </div>
              <h2 id="featured-threat-heading" className="text-2xl font-bold text-white mb-2">
                {featuredThreat.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {featuredThreat.summary}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-slate-800 px-2.5 py-1 text-slate-300 border border-slate-700">Target: General Public & SMEs</span>
                <span className="rounded bg-slate-800 px-2.5 py-1 text-slate-300 border border-slate-700">Vector: SMS & Social Engineering</span>
              </div>
            </div>
            <Link
              href={`/cyber-threats/${featuredThreat.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500 transition whitespace-nowrap"
            >
              Learn How to Protect Yourself
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* 5. WHO ARE YOU? (AUDIENCE SHORTCUTS) */}
        <section aria-labelledby="audience-heading">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 id="audience-heading" className="text-2xl font-bold text-white">Who Are You?</h2>
            <p className="mt-2 text-sm text-slate-400">Tailored cybersecurity toolkits and regulatory compliance resources built for your specific environment.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/for-smes" className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-teal-500/50 hover:bg-slate-900 transition flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white transition">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-teal-300">For SMEs</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">ODPC compliance manuals, ransomware backup strategies, and email security templates.</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-400">Access SME Hub &rarr;</span>
            </Link>

            <Link href="/for-schools" className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-indigo-500/50 hover:bg-slate-900 transition flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300">For Schools</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">Student cyber safety guidelines, classroom device policies, and parental consent templates.</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-400">Access School Hub &rarr;</span>
            </Link>

            <Link href="/for-faith-organizations" className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-amber-500/50 hover:bg-slate-900 transition flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-amber-300">Faith Organizations</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">Protecting congregation member registries, donation data protection, and youth safety.</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-400">Access Faith Hub &rarr;</span>
            </Link>

            <Link href="/stay-safe" className="group rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300">Citizens & Public</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">Plain-English guides on MFA, mobile money safety, email privacy, and recognizing scams.</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">Browse Safety Guides &rarr;</span>
            </Link>
          </div>
        </section>

        {/* 6. FEATURED RESOURCES */}
        <section aria-labelledby="resources-heading">
          <div className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 id="resources-heading" className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-teal-400" />
                Featured Resources & Video Guides
              </h2>
              <p className="mt-1 text-sm text-slate-400">Downloadable policy templates and curated educational video tutorials.</p>
            </div>
            <Link href="/resources" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal-400 hover:text-teal-300">
              Resource Library <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResourcesList.map((res, index) => (
              <div key={res.slug || index} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {res.youtubeId ? (
                      <span className="inline-flex items-center gap-1 rounded bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                        <Play className="h-3 w-3 fill-current" /> Video Guide
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 text-xs font-medium text-teal-300">
                        <FileText className="h-3 w-3" /> Policy Toolkit
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{res.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{res.summary || res.description}</p>
                </div>
                <Link href={res.route || '/resources'} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:underline">
                  View resource <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 7. CYBER CHAMPIONS PROGRAM & UPCOMING EVENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cyber Champions Banner */}
          <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950/30 via-slate-900 to-slate-900 p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-300 mb-4">
                <Users className="h-3.5 w-3.5" />
                <span>Grassroots Awareness Initiative</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Become a Cyber Champion</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Join our network of community leaders, teachers, and IT professionals trained to lead cyber hygiene awareness sessions in schools, local SME hubs, and faith groups.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" /> Free downloadable workshop slide decks & posters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-400" /> Directly impact digital literacy in your local community
                </li>
              </ul>
            </div>
            <Link
              href="/community/cyber-champions"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-500 transition"
            >
              Join the Champions Program
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Upcoming Events Preview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-400" />
                  Upcoming Workshops & Events
                </h3>
                <Link href="/community/events" className="text-xs font-semibold text-teal-400 hover:underline">
                  All Events
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((evt, idx) => (
                  <div key={evt.slug || idx} className="rounded-lg border border-slate-800 bg-slate-900 p-4 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-teal-400">{evt.date || 'Upcoming'}</span>
                      <h4 className="text-sm font-semibold text-white mt-0.5">{evt.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{evt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/community/events"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              View Full Event Schedule
            </Link>
          </div>
        </div>

        {/* 8. COMMUNITY IMPACT STATS */}
        <section aria-label="Community stats" className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold text-teal-400">5,000+</p>
              <p className="mt-1 text-xs font-medium text-slate-400">Citizens Informed</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-teal-400">120+</p>
              <p className="mt-1 text-xs font-medium text-slate-400">SMEs Assisted</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-teal-400">15+</p>
              <p className="mt-1 text-xs font-medium text-slate-400">Policy Toolkits</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-teal-400">24/7</p>
              <p className="mt-1 text-xs font-medium text-slate-400">Incident Guidance</p>
            </div>
          </div>
        </section>

        {/* 9. STAY INFORMED / NEWSLETTER BANNER */}
        <section aria-labelledby="newsletter-heading" className="rounded-2xl bg-blue-700 p-8 text-white text-center">
          <h2 id="newsletter-heading" className="text-2xl font-bold">Stay Ahead of Emerging Cyber Threats</h2>
          <p className="mt-2 text-sm text-blue-100 max-w-xl mx-auto">
            Get urgent scam advisories and practical data protection guidance delivered straight to your inbox.
          </p>
          <NewsletterForm />
        </section>
      </div>
    </div>
  );
}