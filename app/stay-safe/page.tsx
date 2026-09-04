import Link from 'next/link';
import { staySafe } from '@/data/staySafe';

export default function StaySafeHubPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900">Stay Safe Guides</h1>
        <p className="mt-3 text-lg text-slate-600">
          Practical, actionable guides to protect yourself online. Choose a topic to get started.
        </p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staySafe.map((guide) => (
          <Link
            key={guide.slug}
            href={`/stay-safe/${guide.slug}`}
            className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all group"
          >
            <h2 className="text-xl font-semibold text-slate-900 group-hover:text-teal-700">{guide.title}</h2>
            <p className="mt-2 text-sm text-slate-600 line-clamp-3">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}