// components/NewsletterForm.tsx
'use client';

export default function NewsletterForm() {
  return (
    <form
      className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Thank you for subscribing to cyber threat advisories!');
      }}
    >
      <input
        type="email"
        placeholder="Enter your email address"
        className="flex-1 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
        required
      />
      <button
        type="submit"
        className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-teal-400 transition"
      >
        Subscribe
      </button>
    </form>
  );
}