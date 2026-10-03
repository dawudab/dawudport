import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-full border-2 border-[#00ff41] shadow-[0_0_10px_#00ff41] filter grayscale contrast-[1.2]"
      />
      <div className="absolute inset-0 rounded-full pointer-events-none scanlines-overlay-anim"></div>
    </div>
  );
};

export default Avatar;