import React from 'react';

interface IctLogoProps {
  className?: string;
  size?: number;
}

export const IctLogo: React.FC<IctLogoProps> = ({ className = '', size = 32 }) => {
  return (
    <img
      src="https://i.ibb.co/mrRKv4rM/ICT-Logo-new-transparent.png"
      alt="Anambra State ICT Agency Logo animate-fade-in"
      className={`${className} object-contain contrast-[1.15] saturate-[1.1] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_2px_6px_rgba(255,207,0,0.25)] select-none`}
      style={{ width: size, height: 'auto', maxHeight: size }}
      referrerPolicy="no-referrer"
    />
  );
};
