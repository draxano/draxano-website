import React from 'react';

interface BlurredImageProps {
  src: string;
  alt: string;
  className?: string;
  blurAmount?: number;
  tintOpacity?: number;
}

const BlurredImage: React.FC<BlurredImageProps> = ({
  src,
  alt,
  className = '',
  blurAmount = 8,
  tintOpacity = 0.3,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base image with blur */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          filter: `blur(${blurAmount}px)`,
          transform: 'scale(1.1)', // Prevent blur edges from showing
        }}
      />
      {/* Neon green overlay */}
      <div
        className="absolute inset-0 bg-brand-neon mix-blend-overlay pointer-events-none"
        style={{ opacity: tintOpacity }}
      />
      {/* Additional color grading layer */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-neon/20 via-transparent to-brand-neon/10 pointer-events-none"
      />
    </div>
  );
};

export default BlurredImage;
