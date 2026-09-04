import { Eye, Target } from 'lucide-react';

export default function MissionVisionPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
            About Our Initiative
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Mission & Vision
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            We help communities understand practical cybersecurity and data
            protection so they can make safer decisions online and respond
            confidently when something goes wrong.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-teal-500/20 bg-slate-900 p-8 shadow-lg shadow-black/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-500/10">
              <Target className="h-7 w-7 text-teal-400" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Our Mission
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              To empower Kenyan citizens, small and medium-sized enterprises,
              schools, faith organizations, and community leaders with clear,
              practical cybersecurity guidance and awareness of data protection
              responsibilities.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              We aim to make cyber hygiene easier to understand and apply while
              supporting SMEs and other organizations as they strengthen their
              approach to personal data protection and ODPC compliance.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="font-bold text-teal-400">01</span>
                Explain cyber threats in plain English.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-teal-400">02</span>
                Promote practical everyday cyber hygiene.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-teal-400">03</span>
                Support awareness of responsible data protection practices.
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg shadow-black/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800">
              <Eye className="h-7 w-7 text-teal-400" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Our Vision
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              We envision communities across Kenya where people can use digital
              services with greater confidence because they understand common
              threats, protect their information, and know where to seek help
              when incidents occur.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              Our long-term goal is to support a culture in which cybersecurity
              and data protection are part of everyday decisions at home, in
              businesses, in schools, and within community organizations.
            </p>

            <div className="mt-8 border-l-2 border-teal-400 pl-5">
              <p className="text-lg font-medium leading-7 text-white">
                Safer digital communities built through practical knowledge,
                responsible habits, and accessible support.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}