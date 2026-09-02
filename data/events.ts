// data/events.ts

export interface Event {
  title: string;
  slug: string;
  type: 'workshop' | 'webinar' | 'in-person';
  audience: 'general' | 'students' | 'teachers' | 'parents' | 'smes' | 'faith-orgs' | 'volunteers';
  description: string;
  date: string; // ISO date format YYYY-MM-DD
  time: string; // Local time, e.g., "18:00-20:00"
  location?: string; // Physical address or "Online"
  capacity?: number;
  registrationUrl: string;
  imageUrl?: string;
  tags: string[];
}

export interface VolunteerOnboardingStep {
  order: number;
  title: string;
  slug: string;
  description: string;
  estimatedTime: string;
  completionChecklist: string[];
  nextStep?: string;
}

// Upcoming Events & Workshops
export const events: Event[] = [
  {
    title: "Cyber Hygiene 101: Beginner Workshop",
    slug: "cyber-hygiene-101-beginner-workshop",
    type: 'in-person',
    audience: 'general',
    description: "Learn the essentials: strong passwords, MFA setup, spotting phishing emails. Hands-on session with take-home checklist.",
    date: "2026-09-15",
    time: "18:00-20:00",
    location: "Community Center Room 3B, Downtown Branch",
    capacity: 30,
    registrationUrl: "/community/volunteer?ref=workshop-signup",
    tags: ["passwords", "mfa", "phishing", "beginner"]
  },
  {
    title: "Protecting Your Small Business: Cyber Safety for SMEs",
    slug: "protecting-small-business-cyber-safety-smes",
    type: 'webinar',
    audience: 'smes',
    description: "Practical backup strategies, email security for teams, ODPC compliance basics. Q&A included.",
    date: "2026-09-18",
    time: "12:00-13:30",
    location: "Online",
    capacity: 100,
    registrationUrl: "/community/cyber-champions?ref=sme-webinar",
    tags: ["sme", "backup", "compliance", "email-security"]
  },
  {
    title: "Student Digital Safety Night for Parents",
    slug: "student-digital-safety-night-parents",
    type: 'in-person',
    audience: 'parents',
    description: "Understand social media privacy settings, online grooming risks, device security for kids. Interactive demo.",
    date: "2026-09-22",
    time: "19:00-20:30",
    location: "Lincoln High School Auditorium",
    capacity: 50,
    registrationUrl: "/community/volunteer?ref=parent-workshop",
    tags: ["parents", "students", "social-media", "device-security"]
  },
  {
    title: "Data Protection for Faith Communities",
    slug: "data-protection-faith-communities",
    type: 'in-person',
    audience: 'faith-orgs',
    description: "Safeguard member data, secure donation pages, youth communication best practices. Led by church tech volunteers.",
    date: "2026-09-25",
    time: "14:00-16:00",
    location: "St. Mary's Parish Hall",
    capacity: 25,
    registrationUrl: "/community/cyber-champions?ref=faith-workshop",
    tags: ["faith-orgs", "data-protection", "youth", "donations"]
  },
  {
    title: "Recognizing Mobile Money Fraud: Live Demo",
    slug: "recognizing-mobile-money-fraud-live-demo",
    type: 'webinar',
    audience: 'general',
    description: "Real scam examples, how fraudsters operate, step-by-step reporting process. Bring your phone for hands-on practice.",
    date: "2026-09-28",
    time: "17:00-18:30",
    location: "Online",
    capacity: 75,
    registrationUrl: "/community/volunteer?ref=fraud-webinar",
    tags: ["mobile-money", "fraud", "scams", "reporting"]
  },
  {
    title: "Teacher Training: Cybersecurity in the Classroom",
    slug: "teacher-training-cybersecurity-classroom",
    type: 'in-person',
    audience: 'teachers',
    description: "Lesson plans for grades 6-12, student project ideas, handling classroom device incidents. Materials provided.",
    date: "2026-10-02",
    time: "09:00-12:00",
    location: "Regional Education Office, Building A",
    capacity: 40,
    registrationUrl: "/community/cyber-champions?ref=teacher-training",
    tags: ["teachers", "classroom", "lesson-plans", "education"]
  },
  {
    title: "Ransomware Recovery: What Small Businesses Need to Know",
    slug: "ransomware-recovery-small-businesses",
    type: 'webinar',
    audience: 'smes',
    description: "Prevention vs. recovery, backup verification, incident response playbook template. Expert guest speaker.",
    date: "2026-10-05",
    time: "11:00-12:30",
    location: "Online",
    capacity: 80,
    registrationUrl: "/community/volunteer?ref=ransomware-webinar",
    tags: ["ransomware", "backup", "incident-response", "sme"]
  },
  {
    title: "Cyber Champions Program Orientation",
    slug: "cyber-champions-program-orientation",
    type: 'in-person',
    audience: 'volunteers',
    description: "Meet fellow advocates, training roadmap, first mission assignments, mentor pairing. Open to all skill levels.",
    date: "2026-10-08",
    time: "16:00-18:00",
    location: "Community Hub Main Floor",
    capacity: 20,
    registrationUrl: "/community/volunteer?ref=champion-orientation",
    tags: ["cyber-champions", "volunteers", "training", "onboarding"]
  },
  {
    title: "Social Media Privacy Deep Dive",
    slug: "social-media-privacy-deep-dive",
    type: 'webinar',
    audience: 'students',
    description: "Lock down your profiles across platforms, understand data collection, privacy-focused alternatives. Gen-Z friendly.",
    date: "2026-10-12",
    time: "15:00-16:30",
    location: "Online",
    capacity: 60,
    registrationUrl: "/community/cyber-champions?ref=youth-privacy",
    tags: ["students", "social-media", "privacy", "gen-z"]
  },
  {
    title: "Neighborhood Watch: Online Safety Block Party",
    slug: "neighborhood-watch-online-safety-block-party",
    type: 'in-person',
    audience: 'general',
    description: "Casual outdoor meetup, free device security checks, poster giveaways, kid-friendly activities. Family welcome.",
    date: "2026-10-15",
    time: "13:00-16:00",
    location: "Central Park Pavilion, North Entrance",
    capacity: 100,
    registrationUrl: "/community/volunteer?ref=block-party",
    tags: ["community", "outdoor", "family", "awareness"]
  }
];

export const volunteerOnboardingSteps: VolunteerOnboardingStep[] = [
  {
    order: 1,
    title: "Submit Your Interest",
    slug: "submit-interest-form",
    description: "Fill out the volunteer application with your background, availability, and areas of interest (schools, SMEs, faith orgs, etc.)",
    estimatedTime: "10 minutes",
    completionChecklist: [
      "Complete contact information",
      "Select preferred audience segment(s)",
      "Indicate available hours per month",
      "Submit form via /community/volunteer"
    ],
    nextStep: "background-check"
  },
  {
    order: 2,
    title: "Background Check & Verification",
    slug: "background-check-verification",
    description: "Basic background screening required for youth-facing roles. Process takes 2-3 business days.",
    estimatedTime: "2-3 business days",
    completionChecklist: [
      "Receive verification email",
      "Complete online screening questionnaire",
      "Wait for approval notification"
    ],
    nextStep: "foundations-module"
  },
  {
    order: 3,
    title: "Foundations Training Module",
    slug: "foundations-training-module",
    description: "Self-paced online course covering core cybersecurity concepts, platform navigation, and community guidelines.",
    estimatedTime: "90 minutes",
    completionChecklist: [
      "Watch 6 intro videos",
      "Complete quiz (80%+ pass score)",
      "Review site routes and resources"
    ],
    nextStep: "shadow-session"
  },
  {
    order: 4,
    title: "Shadow a Live Session",
    slug: "shadow-live-session",
    description: "Observe an experienced Cyber Champion leading a workshop or webinar. Note-taking encouraged.",
    estimatedTime: "2 hours",
    completionChecklist: [
      "Sign up for shadow slot via volunteer portal",
      "Attend full session as observer",
      "Submit reflection notes (3 questions)"
    ],
    nextStep: "co-facilitate"
  },
  {
    order: 5,
    title: "Co-Facilitate Your First Workshop",
    slug: "co-facilitate-first-workshop",
    description: "Lead alongside a mentor volunteer. Handle Q&A, distribute materials, manage attendance.",
    estimatedTime: "3-4 hours (including prep)",
    completionChecklist: [
      "Partner with assigned mentor",
      "Co-present one session",
      "Collect attendee feedback forms"
    ],
    nextStep: "cyber-champions-badge"
  },
  {
    order: 6,
    title: "Earn Your Cyber Champions Badge",
    slug: "cyber-champions-badge",
    description: "Official certification, badge graphics for social media, access to advanced training tracks and leadership opportunities.",
    estimatedTime: "30 minutes (badge issuance)",
    completionChecklist: [
      "Receive digital badge certificate",
      "Download social media assets",
      "Join Cyber Champions Slack channel",
      "Select advanced specialization track"
    ]
  }
];

// Utility: Get events by audience filter
export function getEventsByAudience(audience: Event['audience']): Event[] {
  return events.filter(event => 
    event.audience === audience || event.audience === 'general'
  );
}

// Utility: Get events by date range
export function getEventsByDateRange(start: string, end: string): Event[] {
  return events.filter(event => 
    event.date >= start && event.date <= end
  );
}

// Utility: Check if event registration is open
export function isRegistrationOpen(event: Event, currentDate: Date = new Date()): boolean {
  const eventDate = new Date(event.date);
  const daysBeforeEvent = Math.ceil((eventDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Close registration 24 hours before event or if at capacity
  return daysBeforeEvent > 1 && (event.capacity === undefined || event.capacity > 0);
}

// Export default for convenience
const exportDefault = {
  events,
  volunteerOnboardingSteps,
  getEventsByAudience,
  getEventsByDateRange,
  isRegistrationOpen
};

export default exportDefault;