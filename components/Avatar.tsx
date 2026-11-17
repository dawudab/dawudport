import React, { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-none overflow-hidden x11-inset bg-white p-0.5">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#d4d0c8] text-[#1e3a5f] font-pixel-ui text-base font-bold">
          DW
        </div>
      )}
    </div>
  );
};

export default Avatar;