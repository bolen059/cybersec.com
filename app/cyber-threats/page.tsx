import Link from 'next/link';
import { threats } from '@/data/threats';
import PageHeader from '@/components/PageHeader';

export default function CyberThreatsPage() {
  return (
    <div>
      <PageHeader title="Cyber Threats" subtitle="Learn about common cyber threats and how to protect yourself." />
      <div className="container-page py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {threats.map((threat) => (
            <Link key={threat.slug} href={threat.slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">{threat.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{threat.title}</h3>
              <p className="text-gray-600">{threat.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}