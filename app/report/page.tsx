'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileWarning,
  ShieldAlert,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types & config
// ---------------------------------------------------------------------------

type IncidentType =
  | 'Phishing & Scams'
  | 'Mobile Money Fraud'
  | 'Ransomware'
  | 'Social Engineering'
  | 'Data Breach'
  | 'Fake Website / SMS'
  | 'Other'
  | '';

interface ReportFormValues {
  incidentType: IncidentType;
  incidentDate: string;
  description: string;
  contactEmail: string;
}

interface FormErrors {
  incidentType?: string;
  incidentDate?: string;
  description?: string;
}

const INCIDENT_TYPES: IncidentType[] = [
  'Phishing & Scams',
  'Mobile Money Fraud',
  'Ransomware',
  'Social Engineering',
  'Data Breach',
  'Fake Website / SMS',
  'Other',
];

const DESCRIPTION_MAX_LENGTH = 1500;

const EMPTY_VALUES: ReportFormValues = {
  incidentType: '',
  incidentDate: '',
  description: '',
  contactEmail: '',
};

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ReportIncidentPage() {
  const [values, setValues] = useState<ReportFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (field: keyof ReportFormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!values.incidentType) nextErrors.incidentType = 'Please select an incident type.';
    if (!values.incidentDate) nextErrors.incidentDate = 'Please provide the date of the incident.';
    else if (values.incidentDate > getToday()) {
      nextErrors.incidentDate = 'The date cannot be in the future.';
    }
    if (values.description.trim().length < 20) {
      nextErrors.description = 'Please add at least a short paragraph describing what happened.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    // TODO: replace with a real API call, e.g. POST to /api/report
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus('success');
  };

  const handleReset = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus('idle');
  };

  const remaining = DESCRIPTION_MAX_LENGTH - values.description.length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-800 bg-red-950/40 px-3 py-1 text-xs font-medium text-red-300">
            <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
            Incident Reporting
          </span>
          <h1 className="mt-4 text-3xl font-semibold text-slate-50 sm:text-4xl">
            Report a Cyber Incident
          </h1>
          <p className="mt-3 text-slate-400">
            Tell us what happened. Reports help the community track emerging scams and threats
            across Kenya so we can warn others faster.
          </p>
        </div>

        <div className="mb-8 rounded-lg border border-red-800 bg-red-950/30 p-4 sm:p-5">
          <div className="flex gap-3">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 flex-none text-red-400"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-red-200">
                This form is not a substitute for a formal legal report
              </p>
              <p className="mt-1 text-sm leading-relaxed text-red-200/90">
                For crimes in progress, financial loss, or matters requiring police or legal
                action, contact the official authorities directly:
              </p>
              <ul className="mt-2.5 space-y-1.5 text-sm text-red-100">
                <li className="flex items-center gap-1.5">
                  <span className="font-medium">DCI Kenya Cybercrime Unit</span>
                  <a
                    href="https://www.dci.go.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-red-300 underline underline-offset-2 hover:text-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                  >
                    dci.go.ke
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <span className="text-red-300">&middot; Emergency: 999 / 112</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="font-medium">
                    Office of the Data Protection Commissioner (ODPC)
                  </span>
                  <a
                    href="https://www.odpc.go.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-red-300 underline underline-offset-2 hover:text-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                  >
                    odpc.go.ke
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {status === 'success' ? (
          <div
            role="status"
            className="rounded-lg border border-teal-800 bg-teal-950/30 p-6 text-center sm:p-8"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-4 text-lg font-semibold text-slate-50">
              Your report has been received
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              Thank you for helping keep the community informed. If this incident involves an
              active threat, financial loss, or requires legal action, please also contact DCI
              Kenya or the ODPC using the details above.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-teal-600 hover:text-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                Report another incident
              </button>
              <Link
                href="/cyber-threats"
                className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                Browse threat guides
              </Link>
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="incident-type"
                className="block text-sm font-medium text-slate-200"
              >
                Incident type <span aria-hidden="true">*</span>
              </label>
              <select
                id="incident-type"
                value={values.incidentType}
                onChange={handleChange('incidentType')}
                aria-required="true"
                aria-invalid={Boolean(errors.incidentType)}
                aria-describedby={errors.incidentType ? 'incident-type-error' : undefined}
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                <option value="" disabled>
                  Select an incident type
                </option>
                {INCIDENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.incidentType && (
                <p id="incident-type-error" className="mt-1.5 text-xs text-red-400">
                  {errors.incidentType}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="incident-date"
                className="block text-sm font-medium text-slate-200"
              >
                Date of incident <span aria-hidden="true">*</span>
              </label>
              <input
                id="incident-date"
                type="date"
                value={values.incidentDate}
                max={getToday()}
                onChange={handleChange('incidentDate')}
                aria-required="true"
                aria-invalid={Boolean(errors.incidentDate)}
                aria-describedby={errors.incidentDate ? 'incident-date-error' : undefined}
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              />
              {errors.incidentDate && (
                <p id="incident-date-error" className="mt-1.5 text-xs text-red-400">
                  {errors.incidentDate}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="incident-description"
                  className="block text-sm font-medium text-slate-200"
                >
                  Description <span aria-hidden="true">*</span>
                </label>
                <span id="incident-description-count" className="text-xs text-slate-500">
                  {values.description.length} / {DESCRIPTION_MAX_LENGTH}
                </span>
              </div>
              <textarea
                id="incident-description"
                value={values.description}
                onChange={handleChange('description')}
                maxLength={DESCRIPTION_MAX_LENGTH}
                rows={6}
                required
                aria-required="true"
                aria-invalid={Boolean(errors.description)}
                aria-describedby={`incident-description-count${
                  errors.description ? ' incident-description-error' : ''
                }`}
                placeholder="What happened? Include what you noticed, any messages or links involved, and roughly when it occurred."
                className="mt-1.5 w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              />
              {errors.description && (
                <p id="incident-description-error" className="mt-1.5 text-xs text-red-400">
                  {errors.description}
                </p>
              )}
              {remaining <= 100 && remaining > 0 && !errors.description && (
                <p className="mt-1.5 text-xs text-amber-500">{remaining} characters remaining</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-slate-200"
              >
                Contact email{' '}
                <span className="font-normal text-slate-500">
                  (optional — only if you're open to follow-up questions)
                </span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={values.contactEmail}
                onChange={handleChange('contactEmail')}
                className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              <FileWarning className="h-4 w-4" aria-hidden="true" />
              {status === 'submitting' ? 'Submitting...' : 'Submit report'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}