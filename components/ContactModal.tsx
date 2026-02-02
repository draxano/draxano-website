import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SITE_CONTENT } from '../constants';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');

    try {
      // Using mailto as a simple solution - opens user's email client
      const subject = encodeURIComponent(`New Project Inquiry: ${formData.title}`);
      const body = encodeURIComponent(
        `From: ${formData.email}\n\nProject Title: ${formData.title}\n\nDescription:\n${formData.description}`
      );

      window.location.href = `mailto:${SITE_CONTENT.global.email}?subject=${subject}&body=${body}`;

      setStatus('success');
      setTimeout(() => {
        setFormData({ email: '', title: '', description: '' });
        setStatus('idle');
        onClose();
      }, 2000);
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 lg:p-10">
      <div
        className="absolute inset-0 bg-brand-dark/95 backdrop-blur-2xl"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl bg-brand-card rounded-[40px] md:rounded-[60px] border border-white/5 overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        {/* Modal Header */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:border-brand-neon hover:text-brand-neon transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-10">
            <div className="w-16 h-16 bg-brand-neon/10 rounded-2xl flex items-center justify-center mb-6 border border-brand-neon/20">
              <Send size={28} className="text-brand-neon" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Start a Project
            </h2>
            <p className="text-brand-muted text-lg">
              Tell me about your idea and I'll get back to you.
            </p>
          </div>

          {/* Success State */}
          {status === 'success' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Ready!</h3>
              <p className="text-brand-muted">Your email client should open shortly.</p>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                <AlertCircle size={40} className="text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Something went wrong</h3>
              <p className="text-brand-muted mb-6">Please try again or email me directly.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-brand-neon font-bold hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Form */}
          {(status === 'idle' || status === 'loading') && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-white font-bold text-sm mb-2">
                  Your Email <span className="text-brand-neon">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full bg-brand-dark text-white px-6 py-4 rounded-2xl outline-none border transition-all placeholder:text-white/20 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/10 focus:border-brand-neon'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-white font-bold text-sm mb-2">
                  Project Title <span className="text-brand-neon">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., E-commerce Platform Redesign"
                  className={`w-full bg-brand-dark text-white px-6 py-4 rounded-2xl outline-none border transition-all placeholder:text-white/20 ${
                    errors.title
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/10 focus:border-brand-neon'
                  }`}
                />
                {errors.title && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-white font-bold text-sm mb-2">
                  Project Description <span className="text-brand-neon">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project, goals, and any specific requirements..."
                  rows={5}
                  className={`w-full bg-brand-dark text-white px-6 py-4 rounded-2xl outline-none border transition-all placeholder:text-white/20 resize-none ${
                    errors.description
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/10 focus:border-brand-neon'
                  }`}
                />
                {errors.description && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle size={14} />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-neon text-brand-dark px-8 py-5 rounded-full font-black text-lg hover:scale-[1.02] transition-transform shadow-lg shadow-brand-neon/10 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </button>

              <p className="text-center text-brand-muted text-sm">
                Or email me directly at{' '}
                <a
                  href={`mailto:${SITE_CONTENT.global.email}`}
                  className="text-brand-neon hover:underline"
                >
                  {SITE_CONTENT.global.email}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
