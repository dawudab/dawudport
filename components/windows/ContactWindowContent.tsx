import React, { useState, useRef } from 'react';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, CONTACT_WHATSAPP_URL } from '@/constants';

type FormStatus = 'idle' | 'composing' | 'submitting_data' | 'submitted' | 'error';

// Firebase Cloud Function URL for sending emails
const CLOUD_FUNCTION_ENDPOINT = 'https://sendemail-p7d44ymx7a-uc.a.run.app';

const ContactWindowContent: React.FC = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting_data');
    setErrorMessage(null);

    const formData = {
      name: name.trim(),
      email: email.trim(),
      message: `${message}\n\nPhone: ${phone || 'Not provided'}`,
    };

    try {
      const response = await fetch(CLOUD_FUNCTION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors',
      });

      if (response.ok) {
        setFormStatus('submitted');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to send transmission. Please try direct email.' }));
        setErrorMessage(errorData.message || 'An unexpected error occurred on the relay.');
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Network error or other issue:', error);
      setErrorMessage('Network error. You can reach out directly via WhatsApp or Email above.');
      setFormStatus('error');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setFormStatus('idle');
    setErrorMessage(null);
    formRef.current?.reset();
  };

  return (
    <div className="h-full terminal-style p-4 sm:p-6 flex flex-col overflow-y-auto font-['JetBrains_Mono'] text-zinc-100 bg-transparent text-[13px] sm:text-sm">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-3 mb-5">
        <p className="text-xs text-zinc-400">// COMMUNICATIONS RELAY</p>
        <h2 className="text-sm sm:text-base font-semibold text-white">Direct Transmissions & Contact</h2>
      </div>

      {/* Two Direct Contact Cards: WhatsApp & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* WhatsApp Card */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-emerald-400 font-semibold tracking-wide">WHATSAPP</span>
              <span className="text-[11px] text-zinc-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
            <p className="text-base font-semibold text-white mt-1">
              {CONTACT_WHATSAPP_DISPLAY}
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Fastest for direct messaging, voice notes, and project inquiries.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06]">
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium py-2 px-3 rounded-lg text-xs transition-colors shadow-[0_4px_16px_rgba(16,185,129,0.2)]"
            >
              <span>Chat on WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Email Card */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-zinc-300 font-semibold tracking-wide">SECURE EMAIL</span>
              <span className="text-[11px] text-zinc-400 bg-white/[0.06] px-2 py-0.5 rounded border border-white/[0.08]">
                INBOX
              </span>
            </div>
            <p className="text-base font-semibold text-white mt-1 truncate">
              {CONTACT_EMAIL}
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Direct email for collaboration, contracts, and proposals.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-1.5 flex-1 bg-white hover:bg-zinc-200 text-zinc-950 font-medium py-2 px-3 rounded-lg text-xs transition-colors shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
            >
              <span>Send Email</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={copyEmailToClipboard}
              className="px-3 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 border border-white/[0.08] rounded-lg text-xs transition-colors"
              title="Copy email address"
            >
              {copiedEmail ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Terminal Form */}
      <div className="border border-white/[0.08] bg-white/[0.02] rounded-xl p-4 sm:p-5 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Terminal Message Dispatch
            </h3>
            <p className="text-[11px] text-zinc-500">
              Or dispatch an encrypted transmission directly from this terminal session.
            </p>
          </div>
          {formStatus === 'submitted' && (
            <span className="text-xs text-emerald-400 font-medium">SENT</span>
          )}
        </div>

        {formStatus === 'submitted' ? (
          <div className="py-4 space-y-2 text-center">
            <p className="text-emerald-400 text-sm font-medium">Transmission Delivered</p>
            <p className="text-zinc-300 text-xs">
              Your message was dispatched to <span className="text-white font-medium">{CONTACT_EMAIL}</span>.
            </p>
            <p className="text-zinc-500 text-xs">Stand by for response or message via WhatsApp anytime.</p>
            <div className="pt-3">
              <button
                type="button"
                className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-zinc-200 px-4 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                onClick={resetForm}
              >
                ‹ Dispatch Another Transmission
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block mb-1 text-xs text-zinc-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/[0.03] border border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] rounded-lg text-zinc-100 placeholder-zinc-600 px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none transition-colors"
                  disabled={formStatus === 'submitting_data'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-xs text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/[0.03] border border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] rounded-lg text-zinc-100 placeholder-zinc-600 px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none transition-colors"
                  disabled={formStatus === 'submitting_data'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 text-xs text-zinc-400">
                Phone / WhatsApp <span className="text-zinc-600">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/[0.03] border border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] rounded-lg text-zinc-100 placeholder-zinc-600 px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none transition-colors"
                disabled={formStatus === 'submitting_data'}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="block mb-1 text-xs text-zinc-400">
                Transmission Body
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/[0.03] border border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] rounded-lg text-zinc-100 placeholder-zinc-600 px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm min-h-[70px] focus:outline-none transition-colors"
                disabled={formStatus === 'submitting_data'}
              />
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="bg-white text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg cursor-pointer font-['JetBrains_Mono'] text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_4px_16px_rgba(255,255,255,0.16)]"
                disabled={formStatus === 'submitting_data'}
              >
                {formStatus === 'submitting_data' ? 'Transmitting...' : 'Dispatch Message'}
              </button>
              {formStatus === 'error' && errorMessage && (
                <p className="text-rose-400 text-xs">{errorMessage}</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactWindowContent;
