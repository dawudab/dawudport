import React, { useState, useRef } from 'react';
import { ThemeMode } from '../../types';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, CONTACT_WHATSAPP_URL } from '@/constants';

type FormStatus = 'idle' | 'composing' | 'submitting_data' | 'submitted' | 'error';

const CLOUD_FUNCTION_ENDPOINT =
  import.meta.env.VITE_CONTACT_FUNCTION_URL || 'https://sendemail-p7d44ymx7a-uc.a.run.app';

interface ContactWindowContentProps {
  theme?: ThemeMode;
}

const ContactWindowContent: React.FC<ContactWindowContentProps> = ({ theme = 'dark' }) => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isDark = theme === 'dark';

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
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Failed to send transmission. Please try direct email.' }));
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
    <div
      className={`h-full terminal-style p-4 sm:p-6 flex flex-col overflow-y-auto font-['JetBrains_Mono'] bg-transparent text-[13px] sm:text-sm ${
        isDark ? 'text-zinc-100' : 'text-slate-800'
      }`}
    >
      {/* Header */}
      <div
        className={`border-b pb-3 mb-5 ${
          isDark ? 'border-white/[0.08]' : 'border-slate-900/[0.08]'
        }`}
      >
        <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
          // COMMUNICATIONS RELAY
        </p>
        <h2
          className={`text-sm sm:text-base font-semibold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Direct Transmissions & Contact
        </h2>
      </div>

      {/* Two Direct Contact Cards: WhatsApp & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* WhatsApp Card */}
        <div
          className={`p-4 sm:p-5 rounded-xl backdrop-blur-xl border transition-all duration-200 flex flex-col justify-between ${
            isDark
              ? 'bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-white/[0.16] hover:border-emerald-500/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.35)]'
              : 'bg-gradient-to-b from-white/85 to-white/65 border-slate-900/[0.12] hover:border-emerald-500/40 shadow-[0_6px_20px_rgba(15,23,42,0.06)]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-emerald-500 font-semibold tracking-wide">WHATSAPP</span>
              <span className="text-[11px] text-emerald-500 font-medium">ACTIVE</span>
            </div>
            <p
              className={`text-base font-semibold mt-1 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {CONTACT_WHATSAPP_DISPLAY}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Fastest for direct messaging, voice notes, and project inquiries.
            </p>
          </div>
          <div
            className={`mt-4 pt-3 border-t ${
              isDark ? 'border-white/[0.08]' : 'border-slate-900/[0.08]'
            }`}
          >
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium py-2 px-3 rounded-lg text-xs transition-colors shadow-[0_4px_16px_rgba(16,185,129,0.25)] active:scale-[0.98]"
            >
              <span>Chat on WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Email Card */}
        <div
          className={`p-4 sm:p-5 rounded-xl backdrop-blur-xl border transition-all duration-200 flex flex-col justify-between ${
            isDark
              ? 'bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-white/[0.16] hover:border-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.35)]'
              : 'bg-gradient-to-b from-white/85 to-white/65 border-slate-900/[0.12] hover:border-slate-900/25 shadow-[0_6px_20px_rgba(15,23,42,0.06)]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span
                className={`font-semibold tracking-wide ${
                  isDark ? 'text-zinc-200' : 'text-slate-700'
                }`}
              >
                SECURE EMAIL
              </span>
              <span className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                INBOX
              </span>
            </div>
            <p
              className={`text-base font-semibold mt-1 truncate ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {CONTACT_EMAIL}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Direct email for collaboration, contracts, and proposals.
            </p>
          </div>
          <div
            className={`mt-4 pt-3 border-t flex items-center gap-2 ${
              isDark ? 'border-white/[0.08]' : 'border-slate-900/[0.08]'
            }`}
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`inline-flex items-center justify-center gap-1.5 flex-1 font-medium py-2 px-3 rounded-lg text-xs transition-colors active:scale-[0.98] ${
                isDark
                  ? 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-[0_4px_16px_rgba(255,255,255,0.18)]'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_14px_rgba(15,23,42,0.18)]'
              }`}
            >
              <span>Send Email</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={copyEmailToClipboard}
              className={`px-3 py-2 rounded-lg text-xs transition-colors active:scale-95 border cursor-pointer ${
                isDark
                  ? 'bg-white/[0.08] hover:bg-white/[0.16] text-zinc-200 border-white/15'
                  : 'bg-slate-900/[0.06] hover:bg-slate-900/[0.12] text-slate-800 border-slate-900/15'
              }`}
              title="Copy email address"
            >
              {copiedEmail ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Terminal Form */}
      <div
        className={`border backdrop-blur-xl rounded-xl p-4 sm:p-5 flex-grow ${
          isDark
            ? 'border-white/[0.16] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.35)]'
            : 'border-slate-900/[0.12] bg-gradient-to-b from-white/85 to-white/65 shadow-[0_6px_20px_rgba(15,23,42,0.06)]'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-zinc-300' : 'text-slate-700'
              }`}
            >
              Terminal Message Dispatch
            </h3>
            <p className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
              Or dispatch an encrypted transmission directly from this terminal session.
            </p>
          </div>
          {formStatus === 'submitted' && (
            <span className="text-xs text-emerald-500 font-medium">SENT</span>
          )}
        </div>

        {formStatus === 'submitted' ? (
          <div className="py-4 space-y-2 text-center">
            <p className="text-emerald-500 text-sm font-medium">Transmission Delivered</p>
            <p className={`text-xs ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
              Your message was dispatched to{' '}
              <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {CONTACT_EMAIL}
              </span>
              .
            </p>
            <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
              Stand by for response or message via WhatsApp anytime.
            </p>
            <div className="pt-3">
              <button
                type="button"
                className={`px-4 py-1.5 rounded-lg text-xs transition-colors cursor-pointer border ${
                  isDark
                    ? 'bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.12] text-zinc-200'
                    : 'bg-slate-900/[0.06] hover:bg-slate-900/[0.12] border-slate-900/15 text-slate-800'
                }`}
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
                <label
                  htmlFor="name"
                  className={`block mb-1 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
                >
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
                  className={`rounded-lg px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none transition-colors border ${
                    isDark
                      ? 'bg-white/[0.03] border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] text-zinc-100 placeholder-zinc-600'
                      : 'bg-white border-slate-900/15 focus:border-slate-900/40 text-slate-900 placeholder-slate-400'
                  }`}
                  disabled={formStatus === 'submitting_data'}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-1 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
                >
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
                  className={`rounded-lg px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none transition-colors border ${
                    isDark
                      ? 'bg-white/[0.03] border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] text-zinc-100 placeholder-zinc-600'
                      : 'bg-white border-slate-900/15 focus:border-slate-900/40 text-slate-900 placeholder-slate-400'
                  }`}
                  disabled={formStatus === 'submitting_data'}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className={`block mb-1 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
              >
                Phone / WhatsApp{' '}
                <span className={isDark ? 'text-zinc-600' : 'text-slate-400'}>(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`rounded-lg px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none transition-colors border ${
                  isDark
                    ? 'bg-white/[0.03] border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] text-zinc-100 placeholder-zinc-600'
                    : 'bg-white border-slate-900/15 focus:border-slate-900/40 text-slate-900 placeholder-slate-400'
                }`}
                disabled={formStatus === 'submitting_data'}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="message"
                className={`block mb-1 text-xs ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
              >
                Transmission Body
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`rounded-lg px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm min-h-[70px] focus:outline-none transition-colors border ${
                  isDark
                    ? 'bg-white/[0.03] border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] text-zinc-100 placeholder-zinc-600'
                    : 'bg-white border-slate-900/15 focus:border-slate-900/40 text-slate-900 placeholder-slate-400'
                }`}
                disabled={formStatus === 'submitting_data'}
              />
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg cursor-pointer font-['JetBrains_Mono'] text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${
                  isDark
                    ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_4px_16px_rgba(255,255,255,0.16)]'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_4px_14px_rgba(15,23,42,0.18)]'
                }`}
                disabled={formStatus === 'submitting_data'}
              >
                {formStatus === 'submitting_data' ? 'Transmitting...' : 'Dispatch Message'}
              </button>
              {formStatus === 'error' && errorMessage && (
                <p className="text-rose-500 text-xs">{errorMessage}</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactWindowContent;
