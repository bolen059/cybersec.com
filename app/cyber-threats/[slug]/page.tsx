import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { threats } from '@/data/threats';

export function generateStaticParams() {
  return threats.map((threat) => ({
    slug: threat.slug,
  }));
}

export default function ThreatDetailPage({ params }: { params: { slug: string } }) {
  const threat = threats.find((item) => item.slug === params.slug);

  if (!threat) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/cyber-threats"
        className="inline-flex items-center text-red-700 hover:text-red-900 mb-6 text-sm font-medium"
      >
        ← Back to Threats
      </Link>
      <article className="bg-white rounded-xl shadow-md border border-red-200 p-8">
        <h1 className="text-3xl font-bold text-red-900 mb-4">{threat.title}</h1>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-slate-500">{threat.category}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            threat.severity === 'Critical' ? 'bg-red-100 text-red-800' :
            threat.severity === 'High' ? 'bg-orange-100 text-orange-800' :
            threat.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-teal-100 text-teal-800'
          }`}>
            {threat.severity}
          </span>
        </div>

        {threat.markdownContent ? (
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{threat.markdownContent}</ReactMarkdown>
          </div>
        ) : (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">{threat.description}</p>
            {threat.technicalMechanics && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Technical Mechanics</h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {threat.technicalMechanics.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
            {threat.indicators && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Indicators</h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {threat.indicators.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
            {threat.mitigation && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Mitigation</h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {threat.mitigation.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
            {threat.response && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Response</h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {threat.response.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
            {threat.odpcCompliance && (
              <section className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-1">ODPC Compliance</h2>
                <p className="text-slate-700">{threat.odpcCompliance}</p>
              </section>
            )}
          </>
        )}
      </article>
    </div>
  );
}