import ThreatDetail from '@/components/ThreatDetail';
import { threats } from '@/data/threats';

export default function PhishingPage() {
  const threat = threats.find(t => t.slug === '/cyber-threats/phishing-scams')!;
  return <ThreatDetail threat={threat} />;
}