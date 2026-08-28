'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLink from './NavLink';
import SearchBar from './SearchBar';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', children: [
      { label: 'Mission & Vision', href: '/about/mission-vision' },
      { label: 'Team', href: '/about/team' },
      { label: 'Partners', href: '/about/partners' },
    ]
  },
  { label: 'Cyber Threats', href: '/cyber-threats', children: [
      { label: 'Phishing & Scams', href: '/cyber-threats/phishing-scams' },
      { label: 'Social Engineering', href: '/cyber-threats/social-engineering' },
      { label: 'Mobile Money Fraud', href: '/cyber-threats/mobile-money-fraud' },
      { label: 'Ransomware', href: '/cyber-threats/ransomware' },
      { label: 'Data Breaches', href: '/cyber-threats/data-breaches' },
    ]
  },
  { label: 'Stay Safe', href: '/stay-safe', children: [
      { label: 'Strong Passwords & MFA', href: '/stay-safe/passwords-mfa' },
      { label: 'Email Safety', href: '/stay-safe/email-safety' },
      { label: 'Social Media Privacy', href: '/stay-safe/social-media-privacy' },
      { label: 'Device Security', href: '/stay-safe/device-security' },
      { label: 'Safe Online Payments', href: '/stay-safe/online-payments' },
    ]
  },
  // ... other items
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-blue-700">CyberAware</span>
        </Link>
        <nav className="hidden lg:flex space-x-4">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link href={item.href} className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === item.href || pathname.startsWith(item.href + '/') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                {item.label}
              </Link>
              {item.children && (
                <div className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  <div className="py-1">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden md:block w-64">
          <SearchBar />
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}