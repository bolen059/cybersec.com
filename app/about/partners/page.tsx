import { Building2, Handshake, HeartHandshake } from 'lucide-react';

const partnerGroups = [
  {
    title: 'Government & Regulatory Partners',
    description:
      'Public institutions and regulatory stakeholders supporting cybersecurity awareness, responsible digital practices, and data protection.',
    icon: Building2,
    partners: [
      {
        name: 'CAK',
        description:
          'Placeholder for communications, cybersecurity awareness, and digital safety collaboration.',
      },
      {
        name: 'ODPC',
        description:
          'Placeholder for data protection awareness and responsible handling of personal information.',
      },
      {
        name: 'Future Public Partner',
        description:
          'Reserved space for additional government or public-sector partnerships.',
      },
    ],
  },
  {
    title: 'Corporate Sponsors',
    description:
      'Organizations that support community education, cybersecurity awareness programs, training, and digital safety initiatives.',
    icon: Handshake,
    partners: [
      {
        name: 'Corporate Partner',
        description:
          'Placeholder for a sponsor supporting cybersecurity education and outreach.',
      },
      {
        name: 'Technology Partner',
        description:
          'Placeholder for a technology organization contributing expertise, tools, or learning resources.',
      },
      {
        name: 'Financial Sector Partner',
        description:
          'Placeholder for a financial services organization supporting fraud awareness and safer digital transactions.',
      },
    ],
  },
  {
    title: 'Community NGOs',
    description:
      'Community and civil society organizations helping extend cybersecurity awareness to people who may not have access to technical training.',
    icon: HeartHandshake,
    partners: [
      {
        name: 'Community Partner',
        description:
          'Placeholder for a community organization supporting local outreach.',
      },
      {
        name: 'Youth & Education Partner',
        description:
          'Placeholder for an organization working with young people, schools, or educators.',
      },
      {
        name: 'Digital Inclusion Partner',
        description:
          'Placeholder for an NGO promoting safer and more inclusive access to digital services.',
      },
    ],
  },
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
            Working Together
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Partners
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Community cybersecurity awareness works best when public
            institutions, businesses, civil society, and local communities work
            together.
          </p>
        </div>

        <div className="mt-14 space-y-16">
          {partnerGroups.map((group) => {
            const Icon = group.icon;

            return (
              <section key={group.title}>
                <div className="flex flex-col gap-5 border-b border-slate-800 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10">
                        <Icon
                          className="h-5 w-5 text-teal-400"
                          aria-hidden="true"
                        />
                      </div>

                      <h2 className="text-2xl font-bold text-white">
                        {group.title}
                      </h2>
                    </div>

                    <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.partners.map((partner) => (
                    <article
                      key={partner.name}
                      className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition duration-300 hover:border-teal-500/40 hover:shadow-lg hover:shadow-black/20"
                    >
                      <div
                        className="flex aspect-[16/7] items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-800/70"
                        aria-label={`${partner.name} logo placeholder`}
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Logo Placeholder
                        </span>
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-white">
                        {partner.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {partner.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-16 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-8">
          <h2 className="text-2xl font-bold text-white">
            Interested in partnering?
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            We welcome partnerships that strengthen practical cybersecurity
            awareness, improve data protection knowledge, and help communities
            access trustworthy digital safety resources.
          </p>
        </section>
      </section>
    </main>
  );
}