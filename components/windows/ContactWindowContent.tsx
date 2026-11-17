import React, { useState, useRef } from 'react';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, CONTACT_WHATSAPP_URL } from '@/constants';

type FormStatus = 'idle' | 'composing' | 'submitting_data' | 'submitted' | 'error';

const CLOUD_FUNCTION_ENDPOINT =
  import.meta.env.VITE_CONTACT_FUNCTION_URL || 'https://sendemail-p7d44ymx7a-uc.a.run.app';

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
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Failed to send message. Please try direct email.' }));
        setErrorMessage(errorData.message || 'An unexpected error occurred.');
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
    <div className="h-full terminal-style p-4 sm:p-6 flex flex-col overflow-y-auto font-mono-body bg-[#e5e7eb] text-[#111827] text-[13px] sm:text-sm">
      {/* Header */}
      <div className="border-b-2 border-[#808080] pb-3 mb-5">
        <p className="text-xs text-[#4b5563]">L3-OS Mail &amp; Messaging Client</p>
        <h2 className="font-pixel-ui text-sm sm:text-base text-[#111827] font-bold mt-1">
          Contact &amp; Inquiries
        </h2>
      </div>

      {/* Two Direct Contact Cards: WhatsApp & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* WhatsApp Card */}
        <div className="p-4 x11-outset flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-pixel-ui text-[#1e3a5f] font-bold">WHATSAPP</span>
              <span className="font-mono-body text-[11px] text-[#15803d] font-semibold">DIRECT</span>
            </div>
            <p className="text-base font-bold text-[#111827] mt-1 tabular-nums">
              {CONTACT_WHATSAPP_DISPLAY}
            </p>
            <p className="text-xs text-[#374151] mt-1">
              Fastest for direct messaging, voice notes, and project inquiries.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#808080]">
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full x11-btn-primary font-pixel-ui font-bold py-2 px-3 text-xs"
            >
              <span>Chat on WhatsApp</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Email Card */}
        <div className="p-4 x11-outset flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-pixel-ui text-[#1e3a5f] font-bold">EMAIL</span>
              <span className="font-mono-body text-[11px] text-[#4b5563]">INBOX</span>
            </div>
            <p className="text-base font-bold text-[#111827] mt-1 truncate">
              {CONTACT_EMAIL}
            </p>
            <p className="text-xs text-[#374151] mt-1">
              Direct email for collaboration, contracts, and proposals.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#808080] flex items-center gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center gap-1.5 flex-1 x11-btn-primary font-pixel-ui font-bold py-2 px-3 text-xs"
            >
              <span>Send Email</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={copyEmailToClipboard}
              className="px-3 py-2 x11-btn font-pixel-ui text-xs font-bold cursor-pointer"
              title="Copy email address"
            >
              {copiedEmail ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Form */}
      <div className="x11-outset p-4 sm:p-5 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-pixel-ui text-xs font-bold uppercase text-[#1e3a5f]">
              Send a Message
            </h3>
            <p className="text-xs text-[#4b5563]">
              Submit your inquiry directly from this form.
            </p>
          </div>
          {formStatus === 'submitted' && (
            <span className="font-pixel-ui text-xs text-[#15803d] font-bold">SENT</span>
          )}
        </div>

        {formStatus === 'submitted' ? (
          <div className="py-5 space-y-2 text-center bg-white x11-inset p-4">
            <p className="font-pixel-ui text-[#15803d] text-sm font-bold">
              Message Sent
            </p>
            <p className="text-xs text-[#111827]">
              Your message was delivered to{' '}
              <span className="font-bold text-[#1e3a5f]">{CONTACT_EMAIL}</span>.
            </p>
            <div className="pt-3">
              <button
                type="button"
                className="x11-btn px-4 py-1.5 font-pixel-ui text-xs font-bold cursor-pointer"
                onClick={resetForm}
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block mb-1 text-xs font-pixel-ui text-[#111827]">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white x11-inset text-[#111827] placeholder-[#6b7280] px-3 py-2 w-full font-mono-body text-xs sm:text-sm focus:outline-none"
                  disabled={formStatus === 'submitting_data'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-xs font-pixel-ui text-[#111827]">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white x11-inset text-[#111827] placeholder-[#6b7280] px-3 py-2 w-full font-mono-body text-xs sm:text-sm focus:outline-none"
                  disabled={formStatus === 'submitting_data'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 text-xs font-pixel-ui text-[#111827]">
                Phone / WhatsApp <span className="text-[#4b5563]">(Optional)</span>:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white x11-inset text-[#111827] placeholder-[#6b7280] px-3 py-2 w-full font-mono-body text-xs sm:text-sm focus:outline-none"
                disabled={formStatus === 'submitting_data'}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="block mb-1 text-xs font-pixel-ui text-[#111827]">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white x11-inset text-[#111827] placeholder-[#6b7280] px-3 py-2 w-full font-mono-body text-xs sm:text-sm min-h-[75px] focus:outline-none"
                disabled={formStatus === 'submitting_data'}
              />
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="x11-btn-primary px-4 py-2 cursor-pointer font-pixel-ui text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                disabled={formStatus === 'submitting_data'}
              >
                {formStatus === 'submitting_data' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'error' && errorMessage && (
                <p className="text-[#b91c1c] text-xs font-medium">{errorMessage}</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactWindowContent;
