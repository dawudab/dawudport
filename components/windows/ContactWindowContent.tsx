
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
    <div className="h-full terminal-style p-4 flex flex-col overflow-y-auto font-['Share_Tech_Mono'] text-[#00ff41] bg-[#0d0d0d]">
      {formStatus === 'idle' && (
        <div id="initiate-contact-view">
          <p className="text-amber-400">[ESTABLISHING SECURE CONNECTION...]</p>
          <p>&gt; Channel open.</p>
          <p>&gt; Route: jihad@dawud.dev</p>
          <br />
          <p
            className="terminal-option cursor-pointer hover:text-[#0d0d0d] hover:bg-[#00ff41]"
            onClick={() => setFormStatus('composing')}
          >
            &gt; INITIATE EMAIL PROTOCOL
          </p>
        </div>
      )}

      {(formStatus === 'composing' || formStatus === 'submitting_data' || formStatus === 'error') && (
        <div id="contact-form-container" className="flex flex-col flex-grow">
          <p className="text-amber-400 mb-2">[COMPOSING TRANSMISSION...]</p>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 flex-grow">
            <div>
              <label htmlFor="name" className="block mb-1">NAME:</label>
              <input
                type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)}
                className="bg-black border border-[#00ff41] text-[#00ff41] p-2 w-full font-['Share_Tech_Mono'] focus:outline-none focus:shadow-[0_0_10px_#00ff41]"
                disabled={formStatus === 'submitting_data'}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">EMAIL:</label>
              <input
                type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="bg-black border border-[#00ff41] text-[#00ff41] p-2 w-full font-['Share_Tech_Mono'] focus:outline-none focus:shadow-[0_0_10px_#00ff41]"
                disabled={formStatus === 'submitting_data'}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1">PHONE (OPTIONAL):</label>
              <input
                type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="bg-black border border-[#00ff41] text-[#00ff41] p-2 w-full font-['Share_Tech_Mono'] focus:outline-none focus:shadow-[0_0_10px_#00ff41]"
                disabled={formStatus === 'submitting_data'}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="block mb-1">MESSAGE:</label>
              <textarea
                id="message" name="message" required value={message} onChange={(e) => setMessage(e.target.value)}
                className="bg-black border border-[#00ff41] text-[#00ff41] p-2 w-full font-['Share_Tech_Mono'] flex-grow-0 min-h-[60px] focus:outline-none focus:shadow-[0_0_10px_#00ff41]"
                disabled={formStatus === 'submitting_data'}
              />
            </div>
            <button
              type="submit"
              className="launch-button mt-4 bg-transparent border border-[#00ff41] text-[#00ff41] px-3 py-1 cursor-pointer font-['Share_Tech_Mono'] hover:bg-[#00ff41] hover:text-[#0d0d0d] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formStatus === 'submitting_data'}
            >
              {formStatus === 'submitting_data' ? 'Sending...' : 'Send Transmission'}
            </button>
             {formStatus === 'error' && errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </form>
        </div>
      )}

      {formStatus === 'submitted' && (
        <div id="confirmation-message">
          <p className="text-green-400">[TRANSMISSION SENT]</p>
          <p>&gt; Your message is now traversing the digital ether.</p>
          <p>&gt; Stand by for response.</p>
          <br />
          <p
            className="terminal-option cursor-pointer hover:text-[#0d0d0d] hover:bg-[#00ff41]"
            onClick={resetForm}
          >
            [&lt; New Transmission]
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactWindowContent;
