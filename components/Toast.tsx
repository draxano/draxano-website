import React, { useEffect, useState } from 'react';
import { CheckCircle, X, Calendar } from 'lucide-react';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  description?: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  isVisible,
  onClose,
  message,
  description,
  duration = 4000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      setProgress(100);

      // Animate progress bar
      const startTime = Date.now();
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        if (remaining <= 0) {
          clearInterval(progressInterval);
        }
      }, 16);

      // Auto close
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 500);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [isVisible, duration, onClose]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 500);
  };

  if (!isVisible && !isAnimating) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] pointer-events-none">
      <div
        className={`
          pointer-events-auto
          relative overflow-hidden
          bg-brand-card/95 backdrop-blur-xl
          border border-white/10
          rounded-[24px]
          shadow-2xl shadow-black/20
          min-w-[320px] max-w-[400px]
          transform-gpu
          ${isAnimating
            ? 'animate-toast-in'
            : 'animate-toast-out'
          }
        `}
      >
        {/* Glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-neon/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-neon/10 rounded-full blur-[40px] pointer-events-none" />

        {/* Content */}
        <div className="relative p-5">
          <div className="flex items-start gap-4">
            {/* Animated icon */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-brand-neon/10 rounded-2xl flex items-center justify-center border border-brand-neon/20 animate-icon-pop">
                <Calendar size={22} className="text-brand-neon" />
              </div>
              {/* Success checkmark overlay */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-brand-card animate-check-pop">
                <CheckCircle size={12} className="text-white" />
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0 pt-1">
              <h4 className="text-white font-bold text-base mb-1 animate-text-slide">
                {message}
              </h4>
              {description && (
                <p className="text-brand-muted text-sm leading-relaxed animate-text-slide-delay">
                  {description}
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-brand-muted hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="h-1 bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-neon via-brand-neon to-green-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes toast-in {
          0% {
            opacity: 0;
            transform: translateY(100%) scale(0.8) rotateX(-10deg);
          }
          50% {
            transform: translateY(-10px) scale(1.02) rotateX(0deg);
          }
          70% {
            transform: translateY(5px) scale(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }

        @keyframes toast-out {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
        }

        @keyframes icon-pop {
          0% {
            transform: scale(0) rotate(-180deg);
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes check-pop {
          0%, 40% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes text-slide {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-toast-in {
          animation: toast-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-toast-out {
          animation: toast-out 0.4s ease-out forwards;
        }

        .animate-icon-pop {
          animation: icon-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
        }

        .animate-check-pop {
          animation: check-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both;
        }

        .animate-text-slide {
          animation: text-slide 0.4s ease-out 0.2s both;
        }

        .animate-text-slide-delay {
          animation: text-slide 0.4s ease-out 0.3s both;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out 0.5s;
        }
      `}</style>
    </div>
  );
};

export default Toast;
