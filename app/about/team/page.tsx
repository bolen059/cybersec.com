import { ShieldCheck, Users, UserRound } from 'lucide-react';

const teamMembers = [
  {
    name: 'Team Member Placeholder',
    role: 'Director of Cyber Awareness',
    bio: 'Leads the platform’s cybersecurity education strategy and helps ensure guidance remains practical, clear, and relevant to Kenyan communities.',
  },
  {
    name: 'Team Member Placeholder',
    role: 'ODPC Compliance Lead',
    bio: 'Supports the development of practical data protection awareness resources for SMEs and organizations handling personal information.',
  },
  {
    name: 'Team Member Placeholder',
    role: 'Community Outreach Coordinator',
    bio: 'Connects cybersecurity awareness resources with schools, community groups, faith organizations, and local audiences.',
  },
  {
    name: 'Team Member Placeholder',
    role: 'Digital Safety Content Lead',
    bio: 'Develops plain-English guides on scams, account security, online privacy, device protection, and incident response.',
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
            The People Behind the Work
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Team
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Our work brings together cybersecurity awareness, data protection,
            community education, and practical digital safety guidance.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <article
              key={member.role}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-xl hover:shadow-black/20"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/10">
                {index === 0 ? (
                  <ShieldCheck
                    className="h-8 w-8 text-teal-400"
                    aria-hidden="true"
                  />
                ) : index === 2 ? (
                  <Users
                    className="h-8 w-8 text-teal-400"
                    aria-hidden="true"
                  />
                ) : (
                  <UserRound
                    className="h-8 w-8 text-teal-400"
                    aria-hidden="true"
                  />
                )}
              </div>

              <h2 className="mt-6 text-lg font-bold text-white">
                {member.name}
              </h2>

              <p className="mt-2 text-sm font-semibold text-teal-400">
                {member.role}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {member.bio}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">
            Community-focused by design
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            This initiative is designed to translate technical cybersecurity
            topics into practical actions that citizens, SMEs, educators,
            parents, youth, and community organizations can understand and use.
          </p>
        </div>
      </section>
    </main>
  );
}