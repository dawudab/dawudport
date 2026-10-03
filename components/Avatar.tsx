import React, { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden border border-white/20 bg-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_10px_28px_rgba(0,0,0,0.55)]">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover filter grayscale contrast-[1.15]"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-200 font-['JetBrains_Mono'] text-lg font-semibold">
          DA
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none scanlines-overlay-anim"></div>
    </div>
  );
};

export default Avatar;