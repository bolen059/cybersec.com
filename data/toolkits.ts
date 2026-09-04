// data/toolkits.ts
// Core toolkit dataset for downloadable policy templates
// Exported interface PolicyToolkit and array `toolkits`

export interface PolicyToolkit {
  id: string;
  slug: string;
  title: string;
  audience: 'sme' | 'school' | 'faith';
  description: string;
  odpcAligned: boolean;
  lastUpdated: string; // ISO date
  markdownContent: string;
  keyClauses: string[];
}

export const toolkits: PolicyToolkit[] = [
  {
    id: "toolkit-sme-001",
    slug: "sme-general-data-protection-policy-odpc",
    title: "SME General Data Protection Policy (ODPC Compliant)",
    audience: "sme",
    description:
      "Executive-ready data protection policy aligned to ODPC requirements, with operational cyber hygiene and incident playbook for small businesses.",
    odpcAligned: true,
    lastUpdated: "2026-09-02T00:00:00Z",
    keyClauses: [
      "Scope and definitions: controller, processor, personal data",
      "Lawful bases: contractual, legal obligation, consent, legitimate interest",
      "Data minimisation and retention schedule",
      "Access control and MFA for privileged accounts",
      "Backup, restore testing, and immutable copy requirement",
      "Incident response: containment, notification, ODPC reporting within thresholds",
      "Third-party DPA and right-to-audit clause"
    ],
    markdownContent: `# SME General Data Protection Policy (ODPC Compliant)

## 1. Purpose and scope
This policy sets out the organisation's approach to protecting personal data in line with ODPC requirements. It applies to all employees, contractors, volunteers, and third-party processors who handle personal data on behalf of the organisation.

**Applies to:** All processing of personal data carried out by the organisation.

---

## 2. Definitions
- **Personal data:** Any information relating to an identifiable person.
- **Processing:** Any operation performed on personal data.
- **Data controller:** The organisation that determines the purposes and means of processing.
- **Data processor:** Any third party processing data on behalf of the controller.

---

## 3. Roles and responsibilities
- **Executive Sponsor:** Approves policy and allocates resources.
- **Data Protection Lead:** Maintains register of processing activities, coordinates ODPC compliance, leads incident response.
- **IT Administrator:** Implements technical controls, manages backups and access.
- **All staff:** Follow policy, report incidents immediately.

Record:
- Data Protection Lead: __________________
- Executive Sponsor: __________________
- IT Administrator: __________________

---

## 4. Lawful basis and data subject rights
**Lawful bases:** Contract performance; legal obligation; consent (documented and revocable); legitimate interests (with DPIA where required).

**Data subject rights:** Access; rectification; erasure; restriction; portability; objection.

Operational requirement: Respond to verified access requests within 30 days and log all requests.

---

## 5. Data lifecycle controls
**Collection:** Only collect data necessary for a documented purpose.

**Retention:** Maintain a retention schedule; delete or anonymise data at end of retention period.

**Storage:** Store data in approved systems; avoid local device storage.

**Deletion:** Use secure deletion methods for digital and physical records.

**Example retention schedule**
| Data category | Retention period | Responsible owner |
|---|---:|---|
| Employee records | 7 years after termination | HR Lead |
| Customer invoices | 6 years | Finance Lead |
| Marketing consent logs | Until consent withdrawn | Marketing Lead |

---

## 6. Security controls and cyber hygiene
**Access control**
- Apply principle of least privilege and role-based access control (RBAC).
- MFA required for all admin and remote access accounts.

**Endpoint & network**
- Device encryption required for all corporate devices.
- Automatic screen lock after 10 minutes of inactivity.
- Patch OS and applications within 30 days of release (or sooner for critical patches).

**Email & web**
- Email filtering and URL scanning enabled.
- Quarterly anti-phishing training and simulated phishing tests.

**Backups**
- Daily incremental backups; weekly full backups.
- Monthly restore test; maintain at least one offline or immutable backup.

**Logging & monitoring**
- Centralised logging for authentication and admin actions; retain logs for 90 days.

**Cyber hygiene checklist**
- [ ] MFA enabled for all privileged accounts.
- [ ] Password policy enforced: minimum 12 characters or passphrase.
- [ ] Devices encrypted and managed.
- [ ] OS and apps patched within 30 days.
- [ ] Daily backups configured; monthly restore test.
- [ ] Anti-malware installed and updated.
- [ ] Email filtering and URL scanning enabled.
- [ ] Quarterly phishing simulation completed.
- [ ] Access reviews every 90 days.

---

## 7. Incident response (executive playbook)
**Immediate (first 60 minutes)**
1. Contain: isolate affected systems; revoke compromised credentials.
2. Notify: Data Protection Lead and Executive Sponsor.
3. Preserve evidence: capture logs; avoid powering down devices.

**Within 24 hours**
- Triage scope and impact; identify data types affected.
- Engage legal counsel if regulated data is involved.

**Within 72 hours**
- If ODPC notification thresholds are met, prepare formal notification to ODPC and affected data subjects.
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

## 8. Third-party processors
- All processors must sign a Data Processing Agreement (DPA).
- Require evidence of security posture (SOC2, ISO27001, or equivalent).
- Include right-to-audit clause and data location/transfer details.

---

## 9. Implementation roadmap (90 days)
- Week 1–2: Appoint Data Protection Lead; publish policy.
- Week 3–6: Configure MFA; enforce password policy; begin asset inventory.
- Week 7–10: Implement backups and restore testing; review vendor DPAs.
- Week 11–13: Conduct phishing simulation; update incident runbook.

---

## 10. Review and sign-off
Approved by: __________________  
Date: __________________  
Version: 1.0  
Next review: 12 months from approval
`
  },

  {
    id: "toolkit-school-001",
    slug: "school-acceptable-use-student-digital-safety",
    title: "School Acceptable Use & Student Digital Safety Policy",
    audience: "school",
    description:
      "Age-appropriate acceptable use policy and data protection guidance for schools, including parental consent templates and incident reporting for pupil data.",
    odpcAligned: true,
    lastUpdated: "2026-09-02T00:00:00Z",
    keyClauses: [
      "Parental consent for non-essential processing (photos, marketing)",
      "Staff MFA and role-based access to pupil records",
      "Device management and network segmentation",
      "Pupil acceptable use rules and reporting channels",
      "Incident response with parent notification and education authority coordination",
      "Retention and pseudonymisation for assessments"
    ],
    markdownContent: `# School Acceptable Use & Student Digital Safety Policy

## Purpose
This policy defines acceptable use of school IT resources, data protection measures for pupil records, and responsibilities for staff, pupils, and parents.

---

## 1. Scope and special considerations
Applies to all staff, pupils, volunteers, contractors, and third-party providers. Special protections apply for minors; parental consent is required for non-essential processing.

---

## 2. Roles
- **Headteacher / Principal:** Policy approval and resource allocation.
- **Data Protection Lead (School):** Maintains pupil data register and parental communications.
- **IT Lead:** Device management, network segmentation, backups.
- **Classroom staff:** Enforce classroom data minimisation and acceptable use.

Record:
- Data Protection Lead: __________________
- Headteacher: __________________
- IT Lead: __________________

---

## 3. Parental consent and pupil rights
- Use a standard parental consent form for photos, marketing, and non-essential processing.
- Maintain a timestamped consent log.
- Respond to verified access requests within 30 days; verify parental involvement for minors where required.

**Parental consent template (short)**
- Child name:
- Class:
- Purpose:
- Data collected:
- Duration:
- Withdrawal instructions:
- Parent signature:
- Date:

---

## 4. Acceptable use (students)
- Use school devices for learning only.
- Do not share passwords.
- Log out of shared devices.
- Do not install apps without teacher approval.
- Report suspicious messages to a teacher or IT Lead.

**Student checklist**
- [ ] Use strong passphrases.
- [ ] Log out after use.
- [ ] Report suspicious content.
- [ ] Do not share personal contact details publicly.

---

## 5. Technical controls
- Staff accounts: MFA mandatory.
- Student accounts: age-appropriate authentication; staff-managed accounts for younger pupils.
- Device management: school-managed devices enrolled and updated automatically.
- Network segmentation: separate guest/student network from administrative systems.
- Backups: daily backups of critical records; termly restore tests.

---

## 6. Incident response for schools
**Immediate**
- Secure affected devices; notify Data Protection Lead and Headteacher.
- If pupil data is affected, prepare parent notification using pre-approved template.

**Communication**
- Use clear, factual language; avoid technical jargon in parent communications.
- Coordinate with local education authority and ODPC if thresholds met.

**Incident log**
- Incident ID:
- Date/time:
- Affected pupils/staff:
- Actions taken:
- Parent notifications:
- Resolution:

---

## 7. Third-party apps and vendors
- Approve educational apps before deployment.
- Require vendor DPA and data handling details.
- Review app permissions and data flows termly.

---

## 8. Review and training
- Annual staff training on data protection and child online safety.
- Termly student awareness sessions appropriate to age group.

Approved by: __________________  
Date: __________________  
Version: 1.0  
Next review: Annually
`
  },

  {
    id: "toolkit-faith-001",
    slug: "faith-community-privacy-donation-consent-guidelines",
    title: "Faith Community Member Privacy & Donation Consent Guidelines",
    audience: "faith",
    description:
      "Privacy and consent guidelines for faith-based organisations covering member data, donation records, event photography, and communications consent aligned with ODPC principles.",
    odpcAligned: true,
    lastUpdated: "2026-09-02T00:00:00Z",
    keyClauses: [
      "Member data minimisation and purpose limitation",
      "Donation records retention and financial confidentiality",
      "Photography and media consent with parental consent for minors",
      "Communications consent and unsubscribe mechanism",
      "Third-party payment processors with DPA",
      "Incident response and community notification"
    ],
    markdownContent: `# Faith Community Member Privacy & Donation Consent Guidelines

## Purpose
Provide clear guidance for faith organisations to manage member personal data, donation records, event photography, and communications consent in line with ODPC principles.

---

## 1. Scope
Applies to all staff, volunteers, clergy, contractors, and third-party providers handling member or donor personal data.

---

## 2. Principles
- **Lawfulness, fairness, transparency:** Communicate purposes clearly.
- **Purpose limitation:** Use data only for stated purposes (membership, pastoral care, donations).
- **Data minimisation:** Collect only what is necessary.
- **Accuracy:** Keep records up to date.
- **Storage limitation:** Retain only as long as required.
- **Integrity and confidentiality:** Protect data with appropriate security.

---

## 3. Member and donor records
- Maintain a register of processing activities for membership and donations.
- Donation records: retain for statutory accounting periods; restrict access to finance team.
- Provide donors with clear receipts and privacy notice at point of donation.

**Donation receipt template (short)**
- Donor name:
- Donation amount:
- Date:
- Purpose:
- Privacy notice link: [insert]

---

## 4. Consent for photography and media
- Obtain explicit consent for photography or video used for publicity.
- For minors, obtain parental consent using a standard form.
- Provide an opt-out mechanism at events.

**Media consent checklist**
- [ ] Purpose explained
- [ ] Where media will be used listed
- [ ] Consent recorded with timestamp
- [ ] Withdrawal mechanism provided

---

## 5. Communications and marketing
- Use opt-in consent for marketing communications where required.
- Provide clear unsubscribe mechanism in every communication.
- Keep a suppression list for those who opt out.

---

## 6. Third-party payment processors and vendors
- Require a DPA with payment processors.
- Confirm data location and transfer safeguards.
- Limit access to donation data to authorised finance personnel.

---

## 7. Incident response and community notification
- Contain and assess incidents affecting member or donor data.
- Notify affected individuals when personal data breach creates a risk to rights and freedoms.
- Use clear, non-alarmist language in community notifications.

**Incident log**
- Incident ID:
- Date/time:
- Affected members/donors:
- Actions taken:
- Notifications:
- Resolution:

---

## 8. Review and governance
- Appoint a Data Protection Lead or designate an existing role.
- Review policy annually or after any incident.
- Provide annual training for staff and volunteers handling personal data.

Approved by: __________________  
Date: __________________  
Version: 1.0  
Next review: 12 months from approval
`
  }
];

export default toolkits;
