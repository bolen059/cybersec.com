export interface Threat {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  whatIs: string;
  howAttacksWork: string;
  warningSigns: string[];
  examples: string[];
  preventionTips: string[];
  ifAffected: string;
  relatedResources: string[];
}

export const threats: Threat[] = [
  {
    slug: '/cyber-threats/phishing-scams',
    title: 'Phishing & Scams',
    icon: '🎣',
    summary: 'Deceptive attempts to steal personal information.',
    whatIs: 'Phishing is a type of cyberattack where attackers impersonate legitimate organizations...',
    howAttacksWork: 'Attackers send emails, SMS, or social media messages that appear to come from trusted sources...',
    warningSigns: ['Urgent or threatening language', 'Suspicious sender address', 'Requests for personal information', 'Spelling and grammar errors'],
    examples: ['Fake M-Pesa promotion messages', 'Emails claiming to be from your bank asking for login details'],
    preventionTips: ['Verify the sender', 'Do not click on suspicious links', 'Use anti-phishing toolbars', 'Enable two-factor authentication'],
    ifAffected: 'If you suspect you have fallen victim to phishing, change your passwords immediately, contact your bank, and report the incident to the relevant authorities.',
    relatedResources: ['/report/recognize', '/stay-safe/email-safety'],
  },
  // ... more threats
];