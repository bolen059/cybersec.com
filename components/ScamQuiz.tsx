// components/ScamQUIZ.tsx

'use client';

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ScenarioType = 'sms' | 'email' | 'listing';

interface QuizQuestion {
  id: string;
  scenarioType: ScenarioType;
  sender: string;
  subject?: string;
  message: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ScamQuizProps {
  /** Optional heading override. */
  heading?: string;
}

// ---------------------------------------------------------------------------
// Question bank
// ---------------------------------------------------------------------------

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-mobile-money',
    scenarioType: 'sms',
    sender: '+254 7XX XXX XXX',
    message:
      'You have received KES 15,000 sent in error. Reply CONFIRM within 10 minutes to reverse the transaction, or your mobile money account will be suspended.',
    prompt: 'What is the safest next step?',
    options: [
      'Reply "CONFIRM" right away so the account is not suspended',
      'Call your mobile money provider using the number on their official app or website to verify the claim',
      'Forward the message to a friend and ask what they think',
      'Send your PIN to the sender so they can process the reversal themselves',
    ],
    correctIndex: 1,
    explanation:
      'Mobile money providers never ask you to reverse a transaction by replying to an SMS, and they will never ask for your PIN. Verify independently through the provider\u2019s official app, USSD code, or customer care line \u2014 never through a number or link the message itself gives you.',
  },
  {
    id: 'q2-lookalike-domain',
    scenarioType: 'email',
    sender: 'support@paypa1-secure.com',
    subject: 'Unusual sign-in activity \u2014 verify your account',
    message:
      'We noticed a login from a new device. Click the link below to verify your identity within 24 hours or your account will be limited.',
    prompt: 'What is the biggest red flag here, and what should you do?',
    options: [
      'Click the link immediately since account limits are urgent',
      'Reply to the email with your username and password to confirm identity',
      'Notice the sender domain is a lookalike (a "1" instead of an "l") and go to the real site by typing the address yourself',
      'Forward the email to your contacts so they can verify too',
    ],
    correctIndex: 2,
    explanation:
      'Lookalike domains that swap letters for similar-looking characters are a classic phishing tell. Never click a link in a message like this \u2014 open a new browser tab and type the company\u2019s real address, or use a saved bookmark instead.',
  },
  {
    id: 'q3-bank-reset-link',
    scenarioType: 'sms',
    sender: 'BankAlert',
    message:
      'Your online banking will be locked in 1 hour due to a security check. Reset your password now: bit.ly/4kzT9q',
    prompt: 'How should you respond to this message?',
    options: [
      'Tap the link straight away to avoid getting locked out',
      'Ignore the countdown and open your bank\u2019s official app or website directly to check your account',
      'Reply "STOP" to unsubscribe from future messages',
      'Wait until the hour is almost up before deciding what to do',
    ],
    correctIndex: 1,
    explanation:
      'A tight deadline plus a shortened link are pressure tactics designed to stop you from thinking it through. Go directly to your bank\u2019s official app or a URL you know is correct \u2014 never through a link a text message gives you.',
  },
  {
    id: 'q4-job-fee',
    scenarioType: 'listing',
    sender: 'HR \u2014 Global Talent Placement',
    subject: 'Job Offer: Remote Data Entry Assistant',
    message:
      'Congratulations! You have been selected for this role. To secure your position, please pay a KES 2,000 registration and processing fee within 48 hours.',
    prompt: 'What should you do about the registration fee?',
    options: [
      'Pay it right away since it seems like a real opportunity',
      'Ask if it can be deducted from your first salary instead',
      'Decline \u2014 legitimate employers cover their own hiring costs and never charge candidates to be hired',
      'Pay half now and half after your first day',
    ],
    correctIndex: 2,
    explanation:
      'Genuine employers never ask candidates to pay to be hired, at any stage or in any amount. A request for an upfront "registration," "training," or "processing" fee is one of the clearest signs of a fake job offer.',
  },
];

const PASS_THRESHOLD = 3; // out of QUESTIONS.length

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

function ScenarioPreview({ question }: { question: QuizQuestion }) {
  const Icon =
    question.scenarioType === 'email' ? Mail : question.scenarioType === 'sms' ? MessageSquare : AlertTriangle;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-slate-100">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {question.scenarioType === 'email'
          ? 'Email'
          : question.scenarioType === 'sms'
            ? 'Text message'
            : 'Job listing'}
      </div>
      <p className="text-sm font-semibold text-slate-100">{question.sender}</p>
      {question.subject && (
        <p className="mt-0.5 text-sm text-slate-300">{question.subject}</p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{question.message}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ScamQuiz({ heading = 'Can You Spot the Scam?' }: ScamQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;
  const hasAnswered = selectedOption !== null;
  const isCorrect = hasAnswered && selectedOption === question.correctIndex;

  const statusMessage = useMemo(() => {
    if (!hasAnswered) return '';
    return isCorrect
      ? `Correct. ${question.explanation}`
      : `Not quite. ${question.explanation}`;
  }, [hasAnswered, isCorrect, question.explanation]);

  const handleSelect = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionIndex);
    if (optionIndex === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsComplete(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsComplete(false);
  };

  const passed = score >= PASS_THRESHOLD;

  if (isComplete) {
    return (
      <section
        aria-labelledby="scam-quiz-heading"
        className="mx-auto w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 id="scam-quiz-heading" className="sr-only">
          {heading} — results
        </h2>

        <div className="flex flex-col items-center text-center">
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full ${
              passed ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {passed ? (
              <ShieldCheck className="h-7 w-7" aria-hidden="true" />
            ) : (
              <AlertTriangle className="h-7 w-7" aria-hidden="true" />
            )}
          </span>

          <p className="mt-4 text-sm font-medium text-slate-500">
            You scored {score} out of {QUESTIONS.length}
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-900">
            {passed ? 'Cyber Aware Specialist' : 'High Risk \u2014 Needs Review'}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
            {passed
              ? 'You correctly spotted the pressure tactics and red flags scammers rely on. Stay sharp \u2014 tactics keep evolving.'
              : 'A few of these scenarios could catch you out. Review the guides below so you can recognize these tactics before they cost you.'}
          </p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/cyber-threats/phishing-scams"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Read the phishing &amp; scams guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/stay-safe/email-safety"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-700 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Email safety tips
            </Link>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="mt-5 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Retake the quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="scam-quiz-heading"
      className="mx-auto w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="scam-quiz-heading" className="text-xl font-semibold text-slate-900">
          {heading}
        </h2>
        <span className="flex-none text-sm font-medium text-slate-500">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </span>
      </div>

      <div
        className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={QUESTIONS.length}
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-blue-700 transition-all"
          style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <ScenarioPreview question={question} />

      <fieldset className="mt-5" disabled={hasAnswered}>
        <legend className="text-sm font-semibold text-slate-900">{question.prompt}</legend>

        <div className="mt-3 flex flex-col gap-2.5">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isRight = index === question.correctIndex;

            let optionStyles =
              'border-slate-300 bg-white text-slate-800 hover:border-blue-600 hover:bg-blue-50/40';
            if (hasAnswered) {
              if (isRight) {
                optionStyles = 'border-green-600 bg-green-50 text-green-900';
              } else if (isSelected && !isRight) {
                optionStyles = 'border-red-600 bg-red-50 text-red-900';
              } else {
                optionStyles = 'border-slate-200 bg-white text-slate-500';
              }
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(index)}
                aria-pressed={isSelected}
                className={`flex items-start gap-2.5 rounded-md border px-4 py-3 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-default ${optionStyles}`}
              >
                <span className="flex-1">{option}</span>
                {hasAnswered && isRight && (
                  <CheckCircle2 className="h-5 w-5 flex-none text-green-700" aria-hidden="true" />
                )}
                {hasAnswered && isSelected && !isRight && (
                  <XCircle className="h-5 w-5 flex-none text-red-700" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Screen-reader announcement, mirrors the visible feedback below */}
      <div role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </div>

      {hasAnswered && (
        <div
          className={`mt-4 rounded-md border p-4 text-sm leading-relaxed ${
            isCorrect ? 'border-green-200 bg-green-50 text-green-900' : 'border-red-200 bg-red-50 text-red-900'
          }`}
        >
          <p className="mb-1 font-semibold">{isCorrect ? 'Correct' : 'Incorrect'}</p>
          <p>{question.explanation}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Score: {score} / {QUESTIONS.length}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={!hasAnswered}
          className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLastQuestion ? 'See results' : 'Next question'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}