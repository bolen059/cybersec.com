'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, Check, Copy, FileText, Printer } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PolicyTemplate {
  id: string;
  title: string;
  /** e.g. "For SMEs", "For Schools", "For Faith Organizations" */
  category?: string;
  description?: string;
  /**
   * Markdown / plain-text body containing placeholder tokens such as
   * [ORGANIZATION_NAME], [DPO_NAME], [DPO_EMAIL], [EFFECTIVE_DATE].
   */
  content: string;
}

export interface PolicyGeneratorProps {
  templates: PolicyTemplate[];
  defaultTemplateId?: string;
}

interface FormValues {
  orgName: string;
  dpoName: string;
  dpoEmail: string;
  effectiveDate: string; // yyyy-mm-dd from <input type="date">
}

type TokenKey = 'ORGANIZATION_NAME' | 'DPO_NAME' | 'DPO_EMAIL' | 'EFFECTIVE_DATE';

const TOKEN_PATTERN = /\[([A-Z_]+)\]/g;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatEffectiveDate(value: string): string {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getTokenValues(values: FormValues): Record<TokenKey, string> {
  return {
    ORGANIZATION_NAME: values.orgName.trim(),
    DPO_NAME: values.dpoName.trim(),
    DPO_EMAIL: values.dpoEmail.trim(),
    EFFECTIVE_DATE: formatEffectiveDate(values.effectiveDate),
  };
}

/** Plain-text version used for clipboard copy — unresolved tokens stay bracketed. */
function buildPlainTextDocument(template: PolicyTemplate, values: FormValues): string {
  const tokenValues = getTokenValues(values);
  return template.content.replace(TOKEN_PATTERN, (match, key: string) => {
    const resolved = tokenValues[key as TokenKey];
    return resolved ? resolved : match;
  });
}

/** Splits content into text/token segments so unresolved tokens can be highlighted in the preview. */
function splitIntoSegments(content: string, tokenValues: Record<TokenKey, string>) {
  const segments: Array<{ type: 'text' | 'filled' | 'missing'; value: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(TOKEN_PATTERN);

  while ((match = pattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: content.slice(lastIndex, match.index) });
    }
    const key = match[1] as TokenKey;
    const resolved = tokenValues[key];
    segments.push(
      resolved
        ? { type: 'filled', value: resolved }
        : { type: 'missing', value: match[0] }
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ type: 'text', value: content.slice(lastIndex) });
  }
  return segments;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PolicyGenerator({ templates, defaultTemplateId }: PolicyGeneratorProps) {
  const [templateId, setTemplateId] = useState(defaultTemplateId ?? templates[0]?.id ?? '');
  const [values, setValues] = useState<FormValues>({
    orgName: '',
    dpoName: '',
    dpoEmail: '',
    effectiveDate: '',
  });
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeTemplate = useMemo(
    () => templates.find((template) => template.id === templateId) ?? templates[0],
    [templates, templateId]
  );

  const tokenValues = useMemo(() => getTokenValues(values), [values]);
  const missingFieldCount = Object.values(tokenValues).filter((value) => !value).length;

  const previewSegments = useMemo(() => {
    if (!activeTemplate) return [];
    return splitIntoSegments(activeTemplate.content, tokenValues);
  }, [activeTemplate, tokenValues]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleFieldChange = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleCopy = useCallback(async () => {
    if (!activeTemplate) return;
    const text = buildPlainTextDocument(activeTemplate, values);
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopyStatus('idle'), 2500);
  }, [activeTemplate, values]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (!activeTemplate) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        No policy templates are available yet.
      </div>
    );
  }

  return (
    <section
      aria-labelledby="policy-generator-heading"
      className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]"
    >
      {/* ------------------------------------------------------------- */}
      {/* Form panel — hidden entirely when printing                    */}
      {/* ------------------------------------------------------------- */}
      <div className="print:hidden">
        <h2
          id="policy-generator-heading"
          className="text-xl font-semibold text-slate-900 dark:text-slate-100"
        >
          Customize Your Policy
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Fill in your organization&apos;s details. The document on the right updates as you type.
        </p>

        {templates.length > 1 && (
          <div className="mt-5">
            <label
              htmlFor="policy-template"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              Policy template
            </label>
            <select
              id="policy-template"
              value={activeTemplate.id}
              onChange={(event) => setTemplateId(event.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.title}
                  {template.category ? ` \u2014 ${template.category}` : ''}
                </option>
              ))}
            </select>
            {activeTemplate.description && (
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                {activeTemplate.description}
              </p>
            )}
          </div>
        )}

        <form className="mt-5 flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label
              htmlFor="org-name"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              Organization name
            </label>
            <input
              id="org-name"
              type="text"
              value={values.orgName}
              onChange={handleFieldChange('orgName')}
              placeholder="e.g. Mwangaza Academy"
              className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="dpo-name"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              Data Protection Officer / focal contact name
            </label>
            <input
              id="dpo-name"
              type="text"
              value={values.dpoName}
              onChange={handleFieldChange('dpoName')}
              placeholder="e.g. Jane Wambui"
              className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="dpo-email"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              Focal contact email
            </label>
            <input
              id="dpo-email"
              type="email"
              value={values.dpoEmail}
              onChange={handleFieldChange('dpoEmail')}
              placeholder="e.g. dpo@mwangaza.ac.ke"
              className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="effective-date"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              Effective date
            </label>
            <input
              id="effective-date"
              type="date"
              value={values.effectiveDate}
              onChange={handleFieldChange('effectiveDate')}
              className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </form>

        {missingFieldCount > 0 && (
          <p className="mt-4 flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-500">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-none" aria-hidden="true" />
            {missingFieldCount} field{missingFieldCount === 1 ? '' : 's'} still need
            {missingFieldCount === 1 ? 's' : ''} to be filled in — highlighted in the preview.
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy formatted policy to clipboard"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-700 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:text-blue-400"
          >
            {copyStatus === 'success' ? (
              <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copyStatus === 'success' ? 'Copied' : 'Copy formatted policy'}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print official document"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print official document
          </button>
        </div>

        <div role="status" aria-live="polite" className="sr-only">
          {copyStatus === 'success' && 'Policy copied to clipboard.'}
          {copyStatus === 'error' && 'Could not copy to clipboard. Please try again.'}
        </div>
        {copyStatus === 'error' && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            Copy failed — your browser may be blocking clipboard access. Try selecting the text in
            the preview instead.
          </p>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Live document preview — the only thing visible when printing  */}
      {/* ------------------------------------------------------------- */}
      <div className="print:col-span-1">
        <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 print:hidden">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Live preview
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 print:rounded-none print:border-none print:p-0 print:shadow-none">
          <header className="mb-6 border-b border-slate-200 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {activeTemplate.category ?? 'Policy Document'}
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900">{activeTemplate.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {tokenValues.ORGANIZATION_NAME || 'Your Organization Name'}
            </p>
          </header>

          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {previewSegments.map((segment, index) => {
              if (segment.type === 'missing') {
                return (
                  <mark
                    key={index}
                    className="rounded bg-amber-100 px-1 py-0.5 font-medium text-amber-900 print:bg-transparent print:font-semibold print:text-amber-800"
                  >
                    {segment.value}
                  </mark>
                );
              }
              return <span key={index}>{segment.value}</span>;
            })}
          </div>

          <footer className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
            Effective date: {tokenValues.EFFECTIVE_DATE || 'Not yet set'}
            {tokenValues.DPO_NAME && (
              <>
                <br />
                Contact: {tokenValues.DPO_NAME}
                {tokenValues.DPO_EMAIL ? ` (${tokenValues.DPO_EMAIL})` : ''}
              </>
            )}
          </footer>
        </div>
      </div>
    </section>
  );
}