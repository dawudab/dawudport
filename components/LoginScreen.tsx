import React, { useState } from 'react';
import { LoggedInUser } from '../types';
import { InfoIcon } from './icons';

interface LoginScreenProps {
  onLogin: (user: LoggedInUser) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('User');
  };

  const handleGuestLogin = () => {
    onLogin('Guest');
  };

  return (
    <div className="relative z-20 flex items-center justify-center w-full h-full p-3 sm:p-4 overflow-hidden">
      <div className="w-[92vw] max-w-sm x11-window-frame p-1">
        {/* Classic Navy X11 Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-3 py-1.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2.5 h-2.5 bg-[#d4d0c8] border border-[#404040] shrink-0" />
            <span className="font-pixel-ui text-xs font-bold tracking-wide truncate">
              Welcome to L3-OS
            </span>
          </div>
          <span className="font-pixel-ui text-[10px] text-white/90 shrink-0">X11 Login</span>
        </div>

        {/* Classic Beveled Gray Dialog Body */}
        <div className="p-4 sm:p-5 space-y-4 text-[#111827]">
          {/* Generic Retro Pixel User Icon & Label */}
          <div className="flex items-center gap-3.5 pb-3.5 border-b border-[#808080] shadow-[0_1px_0_#ffffff]">
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-white x11-inset overflow-hidden flex items-center justify-center p-2">
              <InfoIcon className="w-full h-full" />
            </div>
            <div className="min-w-0">
              <div className="font-pixel-ui text-sm sm:text-base font-bold text-[#111827]">
                User Sign In
              </div>
              <div className="font-mono-body text-xs text-[#374151] mt-0.5">
                L3-OS Desktop Environment
              </div>
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="login-password"
                className="block font-pixel-ui text-xs text-[#111827] mb-1.5"
              >
                Password:
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password or leave blank..."
                className="w-full min-h-[44px] bg-white x11-inset px-3 py-2 text-[#111827] placeholder-[#6b7280] font-mono-body text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="submit"
                className="flex-1 min-h-[44px] x11-btn-primary py-2 px-4 font-pixel-ui text-xs font-bold cursor-pointer whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={handleGuestLogin}
                className="flex-1 min-h-[44px] x11-btn py-2 px-4 font-pixel-ui text-xs font-bold cursor-pointer whitespace-nowrap"
              >
                Continue as Guest
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
