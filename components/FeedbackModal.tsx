'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, MessageSquarePlus, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FeedbackCategory =
  | 'Report Broken Info / Link'
  | 'Suggest New Security Threat'
  | 'General UX / Content Feedback'
  | 'Volunteer / Contributor Inquiry'
  | '';

interface FeedbackFormValues {
  category: FeedbackCategory;
  pageRoute: string;
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  category?: string;
  message?: string;
}

export interface FeedbackModalProps {
  /** Called with the submitted values — wire this up to your API route. */
  onSubmitFeedback?: (values: FeedbackFormValues) => Promise<void> | void;
}

const CATEGORIES: FeedbackCategory[] = [
  'Report Broken Info / Link',
  'Suggest New Security Threat',
  'General UX / Content Feedback',
  'Volunteer / Contributor Inquiry',
];

const MESSAGE_MAX_LENGTH = 1000;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EMPTY_VALUES: FeedbackFormValues = {
  category: '',
  pageRoute: '',
  name: '',
  email: '',
  message: '',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeedbackModal({ onSubmitFeedback }: FeedbackModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // drives enter transition
  const [values, setValues] = useState<FeedbackFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = useCallback(() => {
    setValues({
      ...EMPTY_VALUES,
      pageRoute: typeof window !== 'undefined' ? window.location.pathname : '',
    });
    setErrors({});
    setStatus('idle');
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Enter transition: mount off-screen, then slide in on the next frame.
  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setIsVisible(false);
  }, [isOpen]);

  // Move focus into the dialog once it opens.
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // ESC to close + Tab focus trap.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  const handleChange = (
    field: keyof FeedbackFormValues
  ) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!values.category) nextErrors.category = 'Please select a category.';
    if (!values.message.trim()) nextErrors.message = 'Please add some details before submitting.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      // TODO: replace with a real API call, e.g. POST to /api/feedback
      await onSubmitFeedback?.(values);
      setStatus('success');
    } catch {
      setStatus('idle');
      setErrors({ message: 'Something went wrong sending this. Please try again.' });
    }
  };

  const remainingChars = MESSAGE_MAX_LENGTH - values.message.length;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="feedback-modal"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
      >
        <MessageSquarePlus className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">Feedback / Report Issue</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            aria-hidden="true"
            onClick={closeModal}
            className={`absolute inset-0 bg-slate-950/60 transition-opacity duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            id="feedback-modal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-heading"
            className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-slate-800 bg-slate-900 text-slate-100 shadow-2xl transition-transform duration-300 ease-out ${
              isVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <h2 id="feedback-modal-heading" className="text-base font-semibold text-slate-100">
                Feedback &amp; Issue Report
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Close feedback form"
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p role="status" className="mt-4 text-base font-semibold text-slate-100">
                    Thank you for contributing to community safety!
                  </p>
                  <p className="mt-1.5 text-sm text-slate-400">
                    Your submission has been recorded and will be reviewed by the team.
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-6 rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-teal-500 hover:text-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                  <p className="text-sm text-slate-400">
                    Spot outdated information, a broken link, or a threat we should cover? Let us
                    know below.
                  </p>

                  <div>
                    <label
                      htmlFor="feedback-category"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Category <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="feedback-category"
                      value={values.category}
                      onChange={handleChange('category')}
                      aria-required="true"
                      aria-invalid={Boolean(errors.category)}
                      aria-describedby={errors.category ? 'feedback-category-error' : undefined}
                      className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p
                        id="feedback-category-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-page-route"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Page route
                    </label>
                    <input
                      id="feedback-page-route"
                      type="text"
                      value={values.pageRoute}
                      onChange={handleChange('pageRoute')}
                      placeholder="/stay-safe/passwords-mfa"
                      className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Auto-filled from the page you were on — edit if it's about a different page.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="feedback-name"
                        className="block text-sm font-medium text-slate-200"
                      >
                        Name{' '}
                        <span className="font-normal text-slate-500">(optional)</span>
                      </label>
                      <input
                        id="feedback-name"
                        type="text"
                        value={values.name}
                        onChange={handleChange('name')}
                        className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="feedback-email"
                        className="block text-sm font-medium text-slate-200"
                      >
                        Email{' '}
                        <span className="font-normal text-slate-500">(optional)</span>
                      </label>
                      <input
                        id="feedback-email"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between">
                      <label
                        htmlFor="feedback-message"
                        className="block text-sm font-medium text-slate-200"
                      >
                        Details / message <span aria-hidden="true">*</span>
                      </label>
                      <span id="feedback-message-count" className="text-xs text-slate-500">
                        {values.message.length} / {MESSAGE_MAX_LENGTH}
                      </span>
                    </div>
                    <textarea
                      id="feedback-message"
                      value={values.message}
                      onChange={handleChange('message')}
                      maxLength={MESSAGE_MAX_LENGTH}
                      rows={5}
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={`feedback-message-count${
                        errors.message ? ' feedback-message-error' : ''
                      }`}
                      placeholder="Describe the issue, suggestion, or threat you'd like us to know about..."
                      className="mt-1.5 w-full resize-none rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                    />
                    {errors.message && (
                      <p
                        id="feedback-message-error"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.message}
                      </p>
                    )}
                    {remainingChars <= 50 && remainingChars > 0 && !errors.message && (
                      <p className="mt-1.5 text-xs text-amber-500">
                        {remainingChars} characters remaining
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-1 inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Submit feedback'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}