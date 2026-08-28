import Link from 'next/link';
import QuickTipsCarousel from '@/components/QuickTipsCarousel';
import FeaturedThreat from '@/components/FeaturedThreat';
import AudienceShortcuts from '@/components/AudienceShortcuts';
import NewsAlertList from '@/components/NewsAlertList';
import ResourceCard from '@/components/ResourceCard';
import CyberChampionsSection from '@/components/CyberChampionsSection';
import EventsPreview from '@/components/EventsPreview';
import NewsletterSignup from '@/components/forms/NewsletterSignup';
import CommunityStats from '@/components/CommunityStats';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="container-page text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Protect Yourself. Protect Your Data.</h1>
          <p className="text-xl mb-8">Community Cyber Safety & Data Protection Awareness Initiative</p>
          <div className="flex justify-center space-x-4">
            <Link href="/stay-safe" className="btn btn-accent text-lg">Learn</Link>
            <Link href="/report" className="btn btn-secondary text-lg">Report</Link>
            <Link href="/community/cyber-champions" className="btn btn-secondary text-lg">Join</Link>
          </div>
        </div>
      </section>

      {/* Quick Tips Carousel */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="text-center mb-8">Quick Cybersecurity Tips</h2>
          <QuickTipsCarousel />
        </div>
      </section>

      {/* Latest Alerts */}
      <section className="bg-gray-50 py-12">
        <div className="container-page">
          <h2 className="mb-8">Latest Cybersecurity Alerts</h2>
          <NewsAlertList />
        </div>
      </section>

      {/* Featured Threat */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="mb-8">Featured Cyber Threat</h2>
          <FeaturedThreat />
        </div>
      </section>

      {/* Audience Shortcuts */}
      <section className="bg-gray-50 py-12">
        <div className="container-page">
          <h2 className="mb-8">Who Are You?</h2>
          <AudienceShortcuts />
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* resource cards */}
          </div>
        </div>
      </section>

      {/* Cyber Champions */}
      <section className="bg-gray-50 py-12">
        <div className="container-page">
          <h2 className="mb-8">Cyber Champions Program</h2>
          <CyberChampionsSection />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="mb-8">Upcoming Events & Workshops</h2>
          <EventsPreview />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-700 text-white py-12">
        <div className="container-page text-center">
          <h2 className="mb-4">Stay Informed</h2>
          <NewsletterSignup />
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12">
        <div className="container-page">
          <CommunityStats />
        </div>
      </section>
    </div>
  );
}