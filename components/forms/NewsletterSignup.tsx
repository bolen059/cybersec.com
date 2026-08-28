'use client';
import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    setMessage('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input flex-1"
          aria-label="Email address"
          required
        />
        <button type="submit" className="btn btn-accent" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${status === 'error' ? 'text-red-500' : 'text-green-300'}`}>{message}</p>
      )}
    </form>
  );
}