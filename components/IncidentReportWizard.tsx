'use client';

import { useMemo, useState } from 'react';

type IncidentType =
  | 'mobile-money-fraud'
  | 'phishing-identity-theft'
  | 'ransomware-malware'
  | 'online-harassment-cyberbullying';

type IncidentOption = {
  id: IncidentType;
  title: string;
  description: string;
  evidence: string[];
  mitigation: string[];
};

const INCIDENT_TYPES: IncidentOption[] = [
  {
    id: 'mobile-money-fraud',
    title: 'Mobile Money Fraud',
    description:
      'Unauthorized transfers, fake payment requests, SIM-swap concerns, or suspicious mobile money activity.',
    evidence: [
      'M-Pesa or mobile money transaction IDs and confirmation messages',
      'Screenshots of suspicious SMS messages or chats',
      'Phone numbers used by the suspected scammer',
      'Recipient name and number/account details',
      'Dates, times, and amounts involved',
      'Call logs or communication records',
      'Any links, social media profiles, or websites used in the scam',
    ],
    mitigation: [
      'Contact your mobile money provider immediately',
      'Ask whether the transaction can be stopped, reversed, or investigated',
      'Change passwords for affected email or financial accounts',
      'Report suspected SIM swapping to your mobile network operator',
      'Do not send additional money to anyone promising to recover your funds',
      'Monitor your financial accounts for further suspicious activity',
    ],
  },
  {
    id: 'phishing-identity-theft',
    title: 'Phishing / Identity Theft',
    description:
      'Fake emails, SMS messages, websites, account takeovers, or attempts to steal personal information.',
    evidence: [
      'Screenshots of suspicious emails, SMS messages, or websites',
      'The sender email address or phone number',
      'Full email headers where available',
      'Suspicious URLs or website addresses',
      'Details of information or credentials you entered',
      'Login alerts and account activity records',
      'Screenshots of unauthorized account changes',
    ],
    mitigation: [
      'Change passwords immediately, starting with your email account',
      'Change any other accounts where you reused the same password',
      'Enable multi-factor authentication',
      'Sign out of unfamiliar devices and active sessions',
      'Check recovery email addresses and phone numbers for unauthorized changes',
      'Contact affected service providers if you cannot regain account control',
    ],
  },
  {
    id: 'ransomware-malware',
    title: 'Ransomware / Malware',
    description:
      'Encrypted files, suspicious software, device compromise, ransomware notes, or unusual system behaviour.',
    evidence: [
      'Screenshots of ransom notes or suspicious pop-ups',
      'Copies of suspicious emails or attachments',
      'Names of affected files or folders',
      'The approximate time the problem started',
      'Screenshots of error messages',
      'IP addresses, domains, or URLs if known',
      'System and security logs where available',
      'A list of affected devices and accounts',
    ],
    mitigation: [
      'Disconnect the affected device from Wi-Fi and other networks',
      'Do not delete evidence or immediately wipe the device',
      'Do not connect backup drives to the affected device',
      'Notify your organisation or IT support team if this is a work or school device',
      'Change important passwords from a separate trusted device',
      'Check whether clean backups are available before restoring files',
      'Document what happened before making major changes to the affected system',
    ],
  },
  {
    id: 'online-harassment-cyberbullying',
    title: 'Online Harassment / Cyberbullying',
    description:
      'Threats, repeated abuse, impersonation, non-consensual sharing, stalking, or harmful online behaviour.',
    evidence: [
      'Screenshots showing the full conversation where possible',
      'Usernames and profile links of involved accounts',
      'Phone numbers or email addresses used',
      'Dates and times of incidents',
      'URLs to harmful posts or content',
      'Copies of threats or repeated abusive messages',
      'Names of witnesses who saw the content',
    ],
    mitigation: [
      'Avoid engaging with someone making threats or repeatedly harassing you',
      'Preserve evidence before blocking or deleting conversations',
      'Block and report abusive accounts through the platform',
      'Review privacy settings on affected social media accounts',
      'Tell a trusted person, parent, teacher, employer, or community leader when appropriate',
      'Contact law enforcement immediately if there is an immediate threat to personal safety',
    ],
  },
];

const STEPS = [
  'Incident Type',
  'Collect Evidence',
  'Immediate Action',
  'Report & Escalate',
];

const ESCALATION_CONTACTS = [
  {
    name: 'Kenya CA-CIRT',
    role: 'National cybersecurity incident coordination and reporting',
    website: 'https://ke-cirt.go.ke/',
    websiteLabel: 'Visit Kenya CA-CIRT',
    phone: 'Confirm the current official reporting contacts before calling',
  },
  {
    name: 'Office of the Data Protection Commissioner (ODPC)',
    role: 'Data protection complaints and personal data concerns',
    website: 'https://www.odpc.go.ke/',
    websiteLabel: 'Visit ODPC',
    phone: 'Confirm the current official complaints contact before calling',
  },
  {
    name: 'DCI – Anti-Cybercrime',
    role: 'Cybercrime and serious criminal incidents',
    website: 'https://www.dci.go.ke/',
    websiteLabel: 'Visit the DCI website',
    phone: 'Contact through official DCI reporting channels',
  },
  {
    name: 'Your Bank or Mobile Money Provider',
    role: 'Urgent financial fraud, account compromise, or unauthorized transactions',
    website: '',
    websiteLabel: 'Use your provider’s official website or app',
    phone:
      'Call the number printed on your bank card or use the provider’s verified support channel',
  },
];

export default function IncidentReportWizard() {
  const [step, setStep] = useState(1);
  const [incidentType, setIncidentType] = useState<IncidentType | null>(null);
  const [evidenceChecked, setEvidenceChecked] = useState<string[]>([]);
  const [mitigationChecked, setMitigationChecked] = useState<string[]>([]);

  const selectedIncident = useMemo(
    () => INCIDENT_TYPES.find((incident) => incident.id === incidentType),
    [incidentType]
  );

  const toggleEvidence = (item: string) => {
    setEvidenceChecked((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item]
    );
  };

  const toggleMitigation = (item: string) => {
    setMitigationChecked((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item]
    );
  };

  const selectIncident = (id: IncidentType) => {
    setIncidentType(id);
    setEvidenceChecked([]);
    setMitigationChecked([]);
  };

  const nextStep = () => {
    if (step === 1 && !incidentType) return;
    setStep((current) => Math.min(current + 1, STEPS.length));
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const restartWizard = () => {
    setStep(1);
    setIncidentType(null);
    setEvidenceChecked([]);
    setMitigationChecked([]);
  };

  return (
    <section
      className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      aria-labelledby="incident-wizard-title"
    >
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
          Guided Incident Reporting
        </p>

        <h2
          id="incident-wizard-title"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Take the next step safely
        </h2>

        <p className="mt-3 max-w-2xl text-slate-600">
          This guide helps you identify the incident, preserve useful evidence,
          take immediate action, and find the right place to escalate your
          report.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isComplete = step > stepNumber;

            return (
              <div
                key={label}
                className="flex flex-1 flex-col items-center last:flex-none"
              >
                <div className="flex w-full items-center">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                      isComplete
                        ? 'border-teal-600 bg-teal-600 text-white'
                        : isActive
                          ? 'border-teal-600 bg-teal-50 text-teal-700'
                          : 'border-slate-300 bg-white text-slate-400'
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isComplete ? '✓' : stepNumber}
                  </div>

                  {stepNumber < STEPS.length && (
                    <div
                      className={`mx-2 h-1 flex-1 rounded transition-colors duration-300 ${
                        step > stepNumber ? 'bg-teal-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>

                <span
                  className={`mt-2 hidden text-center text-xs font-medium sm:block ${
                    isActive ? 'text-teal-700' : 'text-slate-500'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-center text-sm text-slate-500 sm:hidden">
          Step {step} of {STEPS.length}: {STEPS[step - 1]}
        </p>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
          <h3 className="text-xl font-bold text-slate-900">
            What type of incident happened?
          </h3>

          <p className="mt-2 text-slate-600">
            Choose the option that best matches what happened. You can restart
            if you need to choose another category later.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {INCIDENT_TYPES.map((incident) => {
              const isSelected = incidentType === incident.id;

              return (
                <button
                  key={incident.id}
                  type="button"
                  onClick={() => selectIncident(incident.id)}
                  className={`rounded-xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-slate-900">
                      {incident.title}
                    </h4>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && '✓'}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {incident.description}
                  </p>
                </button>
              );
            })}
          </div>

          {!incidentType && (
            <p className="mt-4 text-sm font-medium text-red-600">
              Select an incident type to continue.
            </p>
          )}
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && selectedIncident && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
          <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
            {selectedIncident.title}
          </span>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            Collect and preserve evidence
          </h3>

          <p className="mt-2 text-slate-600">
            Check off evidence you already have. Do not edit screenshots or
            alter original messages. Preserve dates, times, transaction details,
            and original files where possible.
          </p>

          <div className="mt-6 space-y-3">
            {selectedIncident.evidence.map((item) => {
              const checked = evidenceChecked.includes(item);

              return (
                <label
                  key={item}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    checked
                      ? 'border-teal-300 bg-teal-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleEvidence(item)}
                    className="mt-1 h-4 w-4 accent-teal-600"
                  />

                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-red-800">
              Important: Preserve before deleting
            </p>
            <p className="mt-1 text-sm leading-6 text-red-700">
              Save screenshots, transaction references, messages, URLs, and
              account activity before blocking accounts, deleting chats, or
              resetting devices.
            </p>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && selectedIncident && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
          <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
            Immediate mitigation
          </span>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            Reduce further harm
          </h3>

          <p className="mt-2 text-slate-600">
            These actions are tailored to the incident you selected. Complete
            the ones that apply to your situation.
          </p>

          <div className="mt-6 space-y-3">
            {selectedIncident.mitigation.map((item) => {
              const checked = mitigationChecked.includes(item);

              return (
                <label
                  key={item}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    checked
                      ? 'border-teal-300 bg-teal-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleMitigation(item)}
                    className="mt-1 h-4 w-4 accent-teal-600"
                  />

                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-red-800">
              If there is an immediate danger
            </p>
            <p className="mt-1 text-sm leading-6 text-red-700">
              If someone has made a credible threat to your physical safety or
              you believe there is an immediate risk of harm, seek urgent help
              through the appropriate emergency and law-enforcement channels.
            </p>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && selectedIncident && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-300">
          <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
            Ready to escalate
          </span>

          <h3 className="mt-4 text-xl font-bold text-slate-900">
            Official reporting and escalation
          </h3>

          <p className="mt-2 text-slate-600">
            Use official channels for your situation. For financial fraud, act
            quickly with your bank or mobile money provider before moving on to
            other reporting channels.
          </p>

          <div className="mt-6 space-y-4">
            {ESCALATION_CONTACTS.map((contact) => (
              <article
                key={contact.name}
                className="rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-sm"
              >
                <h4 className="font-bold text-slate-900">{contact.name}</h4>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {contact.role}
                </p>

                <p className="mt-3 text-sm font-medium text-slate-700">
                  {contact.phone}
                </p>

                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    {contact.websiteLabel}
                    <span aria-hidden="true" className="ml-2">
                      ↗
                    </span>
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h4 className="font-bold text-slate-900">Before submitting a report</h4>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>
                • Explain what happened in chronological order.
              </li>
              <li>
                • Include dates, times, transaction IDs, account names, phone
                numbers, and URLs where relevant.
              </li>
              <li>
                • Attach copies of preserved evidence where the reporting
                channel allows it.
              </li>
              <li>
                • Do not include passwords, PINs, one-time codes, or other
                credentials in your report.
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-5">
            <p className="font-semibold text-teal-900">
              Your incident summary
            </p>

            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Incident type</dt>
                <dd className="font-semibold text-slate-800">
                  {selectedIncident.title}
                </dd>
              </div>

              <div>
                <dt className="text-slate-500">Evidence collected</dt>
                <dd className="font-semibold text-slate-800">
                  {evidenceChecked.length} of {selectedIncident.evidence.length}{' '}
                  items
                </dd>
              </div>

              <div>
                <dt className="text-slate-500">Mitigation actions completed</dt>
                <dd className="font-semibold text-slate-800">
                  {mitigationChecked.length} of{' '}
                  {selectedIncident.mitigation.length} actions
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={previousStep}
          disabled={step === 1}
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Back
        </button>

        {step < STEPS.length ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={step === 1 && !incidentType}
            className="rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={restartWizard}
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Start Again
          </button>
        )}
      </div>
    </section>
  );
}