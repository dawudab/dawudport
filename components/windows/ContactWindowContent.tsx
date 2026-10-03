
import React, { useState, useRef } from 'react';

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
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting_data');
    setErrorMessage(null);

    // Prepare form data matching the expected format
    const formData = {
      name: name.trim(),
      email: email.trim(),
      message: `${message}\n\nPhone: ${phone || 'Not provided'}`
    };

    try {
      const response = await fetch(CLOUD_FUNCTION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors', // Enable CORS
      });

      if (response.ok) {
        setFormStatus('submitted');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to send message. Please try again.' }));
        setErrorMessage(errorData.message || 'An unexpected error occurred on the server.');
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Network error or other issue:", error);
      setErrorMessage('Network error. Please check your connection and try again.');
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
    <div className="h-full terminal-style p-4 sm:p-5 flex flex-col overflow-y-auto font-['JetBrains_Mono'] text-zinc-100 bg-transparent text-[13px] sm:text-sm">
      {formStatus === 'idle' && (
        <div id="initiate-contact-view" className="space-y-2">
          <p className="text-zinc-400 text-xs">Establishing Encrypted Relay</p>
          <p className="text-zinc-200">&gt; Channel status: Ready</p>
          <p className="text-zinc-200">
            &gt; Endpoint: <span className="text-white font-medium">jihad@dawud.dev</span>
          </p>
          <div className="pt-3">
            <button
              type="button"
              className="terminal-option cursor-pointer bg-white text-zinc-950 hover:bg-zinc-200 font-medium px-4 py-2 rounded-lg text-xs transition-colors shadow-[0_4px_20px_rgba(255,255,255,0.16)]"
              onClick={() => setFormStatus('composing')}
            >
              Initiate Email Protocol ›
            </button>
          </div>
        </div>
      )}

      {(formStatus === 'composing' || formStatus === 'submitting_data' || formStatus === 'error') && (
        <div id="contact-form-container" className="flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <p className="text-zinc-400 text-xs">Composing Transmission</p>
            <button
              type="button"
              onClick={resetForm}
              className="text-zinc-500 hover:text-zinc-200 text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 flex-grow">
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
                  placeholder="Dawud..."
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
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/[0.03] border border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] rounded-lg text-zinc-100 placeholder-zinc-600 px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none transition-colors"
                  disabled={formStatus === 'submitting_data'}
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 text-xs text-zinc-400">
                Phone <span className="text-zinc-600">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/[0.03] border border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] rounded-lg text-zinc-100 placeholder-zinc-600 px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm focus:outline-none transition-colors"
                disabled={formStatus === 'submitting_data'}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="block mb-1 text-xs text-zinc-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/[0.03] border border-white/[0.10] focus:border-white/30 focus:bg-white/[0.06] rounded-lg text-zinc-100 placeholder-zinc-600 px-3 py-2 w-full font-['JetBrains_Mono'] text-xs sm:text-sm flex-grow-0 min-h-[76px] focus:outline-none transition-colors"
                disabled={formStatus === 'submitting_data'}
              />
            </div>
            <div className="pt-1 flex items-center gap-3">
              <button
                type="submit"
                className="bg-white text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg cursor-pointer font-['JetBrains_Mono'] text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0_4px_16px_rgba(255,255,255,0.16)]"
                disabled={formStatus === 'submitting_data'}
              >
                {formStatus === 'submitting_data' ? 'Transmitting...' : 'Send Transmission'}
              </button>
              {formStatus === 'error' && errorMessage && (
                <p className="text-rose-400 text-xs">{errorMessage}</p>
              )}
            </div>
          </form>
        </div>
      )}

      {formStatus === 'submitted' && (
        <div id="confirmation-message" className="space-y-2">
          <p className="text-emerald-400 text-xs font-medium">Transmission Delivered</p>
          <p className="text-zinc-200">&gt; Your message is now traversing the digital ether.</p>
          <p className="text-zinc-400">&gt; Stand by for response.</p>
          <div className="pt-3">
            <button
              type="button"
              className="terminal-option cursor-pointer bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.12] text-zinc-100 px-3.5 py-1.5 rounded-lg text-xs transition-colors"
              onClick={resetForm}
            >
              ‹ New Transmission
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactWindowContent;
