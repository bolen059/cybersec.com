import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { staySafe } from '@/data/staySafe';

export function generateStaticParams() {
  return staySafe.map((guide) => ({
    slug: guide.slug,
  }));
}

export default function StaySafeDetailPage({ params }: { params: { slug: string } }) {
  const guide = staySafe.find((item) => item.slug === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/stay-safe"
        className="inline-flex items-center text-teal-700 hover:text-teal-900 mb-6 text-sm font-medium"
      >
        ← Back to Guides
      </Link>
      <article className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{guide.title}</h1>
        {guide.markdownContent ? (
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{guide.markdownContent}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-slate-700 leading-relaxed">{guide.description}</p>
        )}
      </article>
    </div>
  );
}