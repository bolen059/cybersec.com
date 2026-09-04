'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Users,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types & config
// ---------------------------------------------------------------------------

type AudienceOption =
  | 'Schools & Students'
  | 'Faith Organizations & Congregations'
  | 'SMEs & Local Businesses'
  | 'General Public / Community Events';

interface SignupFormValues {
  name: string;
  email: string;
  region: string;
  audiences: AudienceOption[];
}

interface FormErrors {
  name?: string;
  email?: string;
  region?: string;
  audiences?: string;
}

const AUDIENCE_OPTIONS: AudienceOption[] = [
  'Schools & Students',
  'Faith Organizations & Congregations',
  'SMEs & Local Businesses',
  'General Public / Community Events',
];

const KENYAN_COUNTIES = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa',
  'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi',
  'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu',
  'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa',
  "Murang'a", 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
  'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi',
  'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot',
] as const;

const EMPTY_VALUES: SignupFormValues = {
  name: '',
  email: '',
  region: '',
  audiences: [],
};

const HERO_PILLARS = [
  {
    icon: GraduationCap,
    title: 'Schools',
    description: 'Run digital-literacy sessions with students and teachers.',
  },
  {
    icon: Landmark,
    title: 'Faith Organizations',
    description: 'Help congregations protect member data and spot scams.',
  },
  {
    icon: Building2,
    title: 'SMEs',
    description: 'Guide small business owners on cyber hygiene basics.',
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CyberChampionsPage() {
  const [values, setValues] = useState<SignupFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleTextChange = (field: 'name' | 'email' | 'region') => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const toggleAudience = (option: AudienceOption) => {
    setValues((prev) => {
      const isSelected = prev.audiences.includes(option);
      return {
        ...prev,
        audiences: isSelected
          ? prev.audiences.filter((item) => item !== option)
          : [...prev.audiences, option],
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!values.email.trim()) nextErrors.email = 'Please enter an email address.';
    if (!values.region) nextErrors.region = 'Please select your region or county.';
    if (values.audiences.length === 0) {
      nextErrors.audiences = 'Select at least one audience you\u2019d like to help.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    // TODO: replace with a real API call, e.g. POST to /api/cyber-champions
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus('success');
  };

  const handleReset = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus('idle');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-teal-950/40 to-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-700 bg-teal-950/40 px-3 py-1 text-xs font-medium text-teal-300">
            <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
            Grassroots Awareness Initiative
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-slate-50 sm:text-4xl">
            Become a Cyber Champion
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Cyber Champions are volunteers who bring practical digital-safety training to their
            own communities — teaching students, congregations, and small business owners how
            to recognize scams and protect their data.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            {HERO_PILLARS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-100">{title}</p>
                <p className="mt-1 text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        {status === 'success' ? (
          <div
            role="status"
            className="rounded-lg border border-teal-800 bg-teal-950/30 p-6 text-center sm:p-8"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-4 text-lg font-semibold text-slate-50">Welcome to the team!</p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
              Thanks for signing up as a Cyber Champion. Our community coordinator will reach out
              by email within the next few days with onboarding details and upcoming sessions in
              your area.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-teal-600 hover:text-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                Sign up another volunteer
              </button>
              <Link
                href="/community/events"
                className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                See upcoming events
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-slate-50">Sign up as a Cyber Champion</h2>
            <p className="mt-1.5 text-sm text-slate-400">
              Takes less than a minute. We'll match you with training and opportunities near you.
            </p>

            <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="volunteer-name" className="block text-sm font-medium text-slate-200">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="volunteer-name"
                  type="text"
                  value={values.name}
                  onChange={handleTextChange('name')}
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'volunteer-name-error' : undefined}
                  className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                />
                {errors.name && (
                  <p id="volunteer-name-error" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="volunteer-email" className="block text-sm font-medium text-slate-200">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="volunteer-email"
                  type="email"
                  value={values.email}
                  onChange={handleTextChange('email')}
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'volunteer-email-error' : undefined}
                  className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                />
                {errors.email && (
                  <p id="volunteer-email-error" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="volunteer-region" className="block text-sm font-medium text-slate-200">
                  Region / County <span aria-hidden="true">*</span>
                </label>
                <select
                  id="volunteer-region"
                  value={values.region}
                  onChange={handleTextChange('region')}
                  aria-required="true"
                  aria-invalid={Boolean(errors.region)}
                  aria-describedby={errors.region ? 'volunteer-region-error' : undefined}
                  className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                >
                  <option value="" disabled>
                    Select your county
                  </option>
                  {KENYAN_COUNTIES.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p id="volunteer-region-error" className="mt-1.5 text-xs text-red-400">
                    {errors.region}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-slate-200">
                  Target audience you want to help <span aria-hidden="true">*</span>
                </legend>
                <div
                  className="mt-2 flex flex-col gap-2"
                  aria-describedby={errors.audiences ? 'volunteer-audiences-error' : undefined}
                >
                  {AUDIENCE_OPTIONS.map((option) => {
                    const inputId = `audience-${option.replace(/[^a-zA-Z]+/g, '-').toLowerCase()}`;
                    const isChecked = values.audiences.includes(option);
                    return (
                      <label
                        key={option}
                        htmlFor={inputId}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm transition ${
                          isChecked
                            ? 'border-teal-600 bg-teal-950/30 text-teal-100'
                            : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <input
                          id={inputId}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAudience(option)}
                          className="h-4 w-4 flex-none rounded border-slate-600 bg-slate-800 text-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
                {errors.audiences && (
                  <p id="volunteer-audiences-error" className="mt-1.5 text-xs text-red-400">
                    {errors.audiences}
                  </p>
                )}
              </fieldset>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                <Users className="h-4 w-4" aria-hidden="true" />
                {status === 'submitting' ? 'Signing up...' : 'Join as a Cyber Champion'}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}