// data/resources.ts
// Merged Resource Library: Contains both institutional policy guides and educational videos.
// Guaranteed compatibility with lib/search.ts (requires title and slug).

export interface ResourceItem {
  title: string;
  slug: string;
  category: string;
  route?: string;
  summary?: string;
  description?: string;
  markdown?: string;
  youtubeId?: string;
  duration?: string;
  targetAudience?: string;
  tags?: string[];
  [key: string]: any;
}

// 1. Policy & Institutional Guides (From MS Copilot)
export const guideResources: ResourceItem[] = [
  {
    title: "SME Data Protection Policy (ODPC Aligned) & Cyber Hygiene Toolkit",
    slug: "sme-odpc-data-protection-cyber-hygiene",
    category: "Guides & Tools",
    route: "/for-smes/odpc-compliance",
    summary: "Executive-ready ODPC-aligned Data Protection Policy plus a practical cyber hygiene checklist and administrative toolkit for small businesses.",
    description: "An executive-level operational manual for small and medium enterprises covering Data Protection Officer roles, lawful processing bases, retention schedules, and 90-day implementation roadmaps.",
    markdown: `# SME Data Protection Policy (ODPC Aligned) and Cyber Hygiene Toolkit

## Document purpose
This document provides an **ODPC-aligned Data Protection Policy** and an operational **Cyber Hygiene Toolkit** for small and medium enterprises (SMEs). It is designed for executive adoption and administrative implementation.

---

## Table of contents
- **Policy scope and definitions**
- **Governance and roles**
- **Data lifecycle controls**
- **Rights and lawful basis**
- **Security controls and cyber hygiene**
- **Incident response summary**
- **Administrative checklist & templates**
- **References and internal links**

---

## 1. Scope and definitions
**Scope:** Applies to all employees, contractors, volunteers, and third-party service providers who process the organisation's personal data.

**Key definitions**
- **Personal Data:** Any information relating to an identifiable person.
- **Processing:** Any operation performed on personal data.
- **Data Controller:** The organisation that determines the purposes and means of processing.
- **Data Processor:** Any third party processing data on behalf of the controller.

---

## 2. Governance and roles
**Data Protection Officer (DPO) / Data Lead**
- **Title:** Data Protection Lead
- **Responsibilities:** Maintain register of processing activities; coordinate ODPC compliance; lead incident response.

**Executive Sponsor**
- **Title:** CEO / Managing Director
- **Responsibilities:** Approve policy; allocate resources; sign off on high-risk decisions.

**IT Administrator**
- **Responsibilities:** Implement technical controls; maintain backups; manage access.

**Record of roles**
- [ ] **Data Protection Lead:** __________________
- [ ] **Executive Sponsor:** __________________
- [ ] **IT Administrator:** __________________

---

## 3. Lawful basis and data subject rights
**Lawful bases for processing**
- Contractual necessity
- Legal obligation
- Consent (documented and revocable)
- Legitimate interests (with DPIA where required)

**Data subject rights**
- Right to access
- Right to rectification
- Right to erasure (where applicable)
- Right to restrict processing
- Right to data portability
- Right to object

**Operational steps**
- [ ] Maintain a simple access request form.
- [ ] Log all requests and responses within 30 days.

---

## 4. Data lifecycle controls
**Data minimisation**
- Collect only required fields; document purpose for each field.

**Retention**
- Define retention periods per data category; publish retention schedule.

**Storage**
- Store personal data in approved systems only; avoid local device storage.

**Deletion**
- Secure deletion procedures for digital and physical records.

**Template: Retention schedule (example)**
| Data category | Retention period | Responsible owner |
|---|---:|---|
| Employee records | 7 years after termination | HR Lead |
| Customer invoices | 6 years | Finance Lead |
| Marketing consent logs | Until consent withdrawn | Marketing Lead |

---

## 5. Security controls and cyber hygiene (Operational)
**Access control**
- Principle of least privilege; role-based access control (RBAC).
- Multi-factor authentication (MFA) required for all admin accounts.

**Endpoint & network**
- Enforce device encryption; automatic screen lock after 10 minutes.
- Maintain up-to-date OS and application patching schedule.

**Email & web**
- Anti-phishing training quarterly; email filtering for attachments and links.
- Block known malicious domains at gateway.

**Backups**
- Daily incremental backups; weekly full backups; monthly restore test.
- Keep at least one offline or immutable backup copy.

**Logging & monitoring**
- Centralised logs for authentication and admin actions; retain logs for 90 days.

**Cyber Hygiene Checklist (copyable)**
- [ ] MFA enabled for all privileged accounts.
- [ ] Password policy enforced: minimum 12 characters or passphrase.
- [ ] Devices encrypted and managed.
- [ ] OS and apps patched within 30 days of release.
- [ ] Daily backups configured; restore test performed monthly.
- [ ] Anti-malware installed and updated.
- [ ] Email filtering and URL scanning enabled.
- [ ] Quarterly phishing simulation and training completed.
- [ ] Access reviews performed every 90 days.

---

## 6. Incident response summary (executive playbook)
**Immediate actions (first 60 minutes)**
1. **Contain:** Isolate affected systems; revoke compromised credentials.
2. **Notify:** Inform Data Protection Lead and Executive Sponsor.
3. **Preserve evidence:** Do not power down devices; capture logs and timestamps.

**24-hour actions**
- Triage scope and impact; identify data types affected.
- Notify legal counsel if regulated data is involved.

**72-hour actions**
- If ODPC notification thresholds met, prepare formal notification to ODPC and affected data subjects.
- Document root cause and remediation plan.

**Incident log template**
- Incident ID:
- Date/time detected:
- Reporter:
- Systems affected:
- Data types involved:
- Actions taken:
- Resolution date:

---

## 7. Administrative templates & checklists
**A. Data processing register (table)**
| Processing activity | Purpose | Data categories | Legal basis | Retention | Processor |
|---|---|---|---|---|---|
| Payroll | Employee pay | Employee personal data | Contract | 7 years | Payroll provider |

**B. Consent record (checkbox form)**
- [ ] Purpose described
- [ ] Data fields listed
- [ ] Consent recorded with timestamp
- [ ] Withdrawal mechanism provided

**C. Third-party vendor security checklist**
- [ ] Contract includes data processing agreement (DPA).
- [ ] Vendor provides SOC2/ISO27001 evidence or equivalent.
- [ ] Right to audit clause present.
- [ ] Data location and transfer details documented.

---

## 8. Implementation roadmap (90 days)
**Week 1–2**
- Appoint Data Protection Lead; publish policy.

**Week 3–6**
- Configure MFA; enforce password policy; begin asset inventory.

**Week 7–10**
- Implement backups and restore testing; vendor DPA reviews.

**Week 11–13**
- Conduct phishing simulation; update incident response runbook.

---

## 9. Internal links and resources
- ODPC compliance hub: **/for-smes/odpc-compliance**
- Cyber hygiene guides: **/for-smes/cyber-hygiene**
- Incident reporting: **/report**

---

## 10. Sign-off** Approved by: __________________  
**Date:** __________________

**Version:** 1.0  
**Next review:** 12 months from approval
`
  },
  {
    title: "School Data Protection Policy (ODPC Aligned) & Student-Focused Cyber Hygiene Guide",
    slug: "school-odpc-data-protection-cyber-hygiene",
    category: "Guides & Tools",
    route: "/for-schools",
    summary: "ODPC-aligned Data Protection Policy tailored for schools with student privacy clauses, parental consent templates, and age-appropriate cyber hygiene guidance.",
    description: "Policy framework tailored for educational institutions addressing minor consent rules, classroom device management, photo usage policies, and student-friendly cyber hygiene practices.",
    markdown: `# School Data Protection Policy (ODPC Aligned) and Student-Focused Cyber Hygiene Guide

## Purpose
Provide a clear, implementable Data Protection Policy for educational institutions and a practical cyber hygiene guide for staff, students, and parents.

---

## Table of contents
- Policy scope and special considerations for minors
- Roles and responsibilities
- Consent and parental involvement
- Data minimisation and classroom practices
- Technical controls and student device guidance
- Incident response and reporting for schools
- Templates: parental consent, student acceptable use, staff checklist

---

## 1. Scope and special considerations
**Scope:** All staff, contractors, volunteers, students, and third-party providers handling pupil or staff personal data.

**Special considerations for minors**
- Default to parental consent for pupils under the age defined by local regulation.
- Limit collection of pupil data to educational purposes only.

---

## 2. Roles and responsibilities
**Data Protection Lead (School)**
- Maintain pupil data register; coordinate parental communications.

**Headteacher / Principal**
- Policy approval; resource allocation.

**Classroom Teacher**
- Ensure classroom data practices follow minimisation and consent rules.

**IT Lead**
- Manage school network, device management, and backups.

**Record of roles**
- [ ] Data Protection Lead: __________________
- [ ] Headteacher: __________________
- [ ] IT Lead: __________________

---

## 3. Consent, parental rights, and pupil rights
**Parental consent**
- Use a standard parental consent form for non-essential processing (e.g., photos for marketing).
- Maintain a log of consents with timestamps.

**Pupil rights**
- Right to access educational records; requests handled within 30 days.
- Special handling for requests from minors — verify parental involvement where required.

**Parental consent template (summary)**
- Purpose: __________________
- Data collected: __________________
- Duration: __________________
- Withdrawal instructions: __________________

---

## 4. Data minimisation and classroom practices
**Classroom rules**
- Avoid collecting unnecessary personal identifiers in class activities.
- Use anonymised or pseudonymised data for assessments where possible.

**Student devices**
- School-managed devices must be enrolled in device management.
- Personal devices: restrict access to sensitive systems; use guest network.

**Record-keeping**
- Maintain a simple register of student data processing activities.

---

## 5. Technical controls and cyber hygiene (students & staff)
**Access and authentication**
- Staff: MFA mandatory.
- Students: age-appropriate authentication; staff-managed accounts for younger pupils.

**Device & application controls**
- Approved educational apps only; vet third-party apps for data handling.
- Automatic updates for school-managed devices.

**Network**
- Segmented network: separate guest/student network from administrative systems.

**Backups & continuity**
- Daily backups of critical school records; test restores termly.

**Student cyber hygiene checklist (age-adapted)**
- [ ] Use strong passphrases; do not share passwords.
- [ ] Log out of shared devices after use.
- [ ] Report suspicious emails or messages to teacher/IT Lead.
- [ ] Do not install apps without teacher approval.
- [ ] Keep devices updated.

---

## 6. Incident response for schools
**Immediate steps**
- Secure affected devices; notify Data Protection Lead and Headteacher.
- If pupil data is involved, notify parents where required by policy.

**Communication**
- Use pre-approved parent communication templates for data incidents.
- Coordinate with local education authority and ODPC if thresholds met.

**Incident log (school)**
- Incident ID:
- Date/time:
- Affected pupils/staff:
- Actions taken:
- Parent notifications:
- Resolution:

---

## 7. Templates and forms (copy-paste)
**A. Parental consent form**
- Child name:
- Class:
- Purpose of data use:
- Consent: [ ] I consent  [ ] I do not consent
- Signature:
- Date:

**B. Student Acceptable Use Policy (short)**
- I will use school devices for learning only.
- I will not share my password.
- I will tell a teacher about anything that worries me online.
- Student signature: __________ Date: __________

**C. Staff checklist on pupil data**
- [ ] Only collect necessary pupil data.
- [ ] Store pupil data in approved systems.
- [ ] Use pseudonymisation for assessments where possible.
- [ ] Ensure parental consent recorded for photos/media.

---

## 8. Implementation roadmap (term-based)
**Term 1**
- Appoint Data Protection Lead; publish policy; collect parental consents for media.

**Term 2**
- Enforce device management; segment networks; run staff training.

**Term 3**
- Conduct table-top incident exercise; review third-party apps.

---

## 9. Internal links and resources
- School hub: **/for-schools**
- Student safety guides: **/stay-safe**
- Incident reporting: **/report/recognize**; evidence guidance **/report/evidence**

---

## 10. Sign-off** Approved by: __________________  
**Date:** __________________

**Version:** 1.0  
**Next review:** Annually or after any major incident
`
  }
];

// 2. Educational Video Resources (From Mistral AI)
export const videoResources: ResourceItem[] = [
  {
    title: "Ransomware - Cybersecurity for Small Business",
    slug: "ftc-ransomware-small-business",
    summary: "This FTC video explains how ransomware attacks happen and practical steps small businesses can take to protect against this growing cyber threat.",
    description: "Explains how ransomware attacks happen and practical steps small businesses can take to protect against this growing cyber threat.",
    category: "Video Guide",
    youtubeId: "cy2ZWi49E2A",
    duration: "3 min",
    targetAudience: "SMEs",
    tags: ["ransomware", "FTC", "small business", "cybersecurity basics"],
    route: "/for-smes/backups-ransomware",
  },
  {
    title: "Cybersecurity Basics for Small Business",
    slug: "ftc-cybersecurity-basics-small-business",
    summary: "Learn essential cybersecurity basics and how to implement them in your small business to reduce risk of cyber attacks.",
    description: "Learn essential cybersecurity basics and how to implement them in your small business to reduce risk of cyber attacks.",
    category: "Tutorial",
    youtubeId: "kGPCUvZZ6FM",
    duration: "4 min",
    targetAudience: "SMEs",
    tags: ["FTC", "cybersecurity basics", "small business", "risk management"],
    route: "/for-smes/cyber-hygiene",
  },
  {
    title: "Protecting Small Businesses: Spot and Avoid Scams",
    slug: "ftc-protecting-small-businesses-scams",
    summary: "FTC Chairman Ferguson provides actionable advice to help business owners recognize and avoid common scams targeting small businesses.",
    description: "Actionable advice to help business owners recognize and avoid common scams targeting small businesses.",
    category: "Regional Alert",
    youtubeId: "Kap2BwvSKrQ",
    duration: "2 min",
    targetAudience: "SMEs",
    tags: ["FTC", "scam awareness", "small business", "fraud prevention"],
    route: "/for-smes/email-data-security",
  },
  {
    title: "Security Awareness: Password Best Practices",
    slug: "security-awareness-passwords",
    summary: "A humorous and engaging animated video covering password security fundamentals, including password managers and unique passwords.",
    description: "Animated video covering password security fundamentals, including password managers and unique passwords.",
    category: "Video Guide",
    youtubeId: "0Wd3JoUHXno",
    duration: "3 min",
    targetAudience: "General Public",
    tags: ["passwords", "MFA", "NCSA", "Adobe", "animated"],
    route: "/stay-safe/passwords-mfa",
  },
  {
    title: "Security Awareness: Phishing and Ransomware",
    slug: "security-awareness-phishing-ransomware",
    summary: "Explains how phishing leads to ransomware attacks and provides clear guidance on how to recognize and avoid these threats.",
    description: "Explains how phishing leads to ransomware attacks and provides clear guidance on how to recognize and avoid these threats.",
    category: "Tutorial",
    youtubeId: "D_yAYhjNE-0",
    duration: "3 min",
    targetAudience: "General Public",
    tags: ["phishing", "ransomware", "NCSA", "Adobe", "email safety"],
    route: "/cyber-threats/phishing-scams",
  },
  {
    title: "Password Protection: Security Awareness Animation",
    slug: "mediapro-password-protection",
    summary: "A free, shareable animated video reminding employees and users of the importance of creating and maintaining secure passwords.",
    description: "Animated video reminding employees and users of the importance of creating and maintaining secure passwords.",
    category: "Video Guide",
    youtubeId: "1TGZNA1eTOU",
    duration: "2 min",
    targetAudience: "SMEs",
    tags: ["password security", "animation", "MediaPro", "employee training"],
    route: "/stay-safe/passwords-mfa",
  },
  {
    title: "Free Phishing Awareness Videos 2024",
    slug: "free-phishing-awareness-2024",
    summary: "Explains how even tech-savvy individuals can fall for phishing scams, detailing how scammers prey on emotions like curiosity, fear, and greed.",
    description: "Explains how scammers prey on emotions like curiosity, fear, and greed to trick victims into clicking malicious links.",
    category: "Regional Alert",
    youtubeId: "6EmD3k3Pb8Y",
    duration: "4 min",
    targetAudience: "General Public",
    tags: ["phishing", "social engineering", "2024", "scam tactics"],
    route: "/cyber-threats/phishing-scams",
  },
  {
    title: "Phishing Training in Under 2 Minutes",
    slug: "phishing-training-under-2-minutes",
    summary: "A concise, fast-paced overview of phishing attacks and how to defend against them in today's digital world.",
    description: "A concise, fast-paced overview of phishing attacks and how to defend against them in today's digital world.",
    category: "Tutorial",
    youtubeId: "Wd-T8-VlmhU",
    duration: "2 min",
    targetAudience: "Students",
    tags: ["phishing", "quick training", "cybersecurity awareness"],
    route: "/for-schools/students",
  },
];

// 3. Global Combined Resources Export (For lib/search.ts and Resource Pages)
export const resources: ResourceItem[] = [...guideResources, ...videoResources];

export default resources;