
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Instagram, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, SITE_CONTENT } from '../constants';

const Footer: React.FC = () => {
  const { global } = SITE_CONTENT;

  return (
    <footer className="bg-brand-dark pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-neon rounded-xl flex items-center justify-center rotate-45">
                <div className="w-5 h-5 bg-brand-dark rounded -rotate-45"></div>
              </div>
              <span className="font-bold text-2xl tracking-tight">{global.name}</span>
            </Link>
            <p className="text-brand-muted text-lg max-w-sm mb-8 leading-relaxed">
              Software engineering focused on building reliable, scalable, and well-structured systems.
            </p>
            <div className="flex gap-4">
              <a href={global.socials.linkedin} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:border-brand-neon hover:text-brand-neon transition-all">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${global.email}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:border-brand-neon hover:text-brand-neon transition-all">
                <Mail size={18} />
              </a>
              <a href={global.socials.instagram} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-muted hover:border-brand-neon hover:text-brand-neon transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Navigation</h4>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-brand-muted hover:text-brand-neon transition-colors flex items-center gap-2 group">
                    {item.label}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-brand-muted">
              <li>{global.location}</li>
              <li>{global.email}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-brand-muted text-sm">
          <p>© {new Date().getFullYear()} {global.name}. All rights reserved.</p>
          <span className="hidden md:block w-1 h-1 rounded-full bg-white/20"></span>
          <p>Powered <span className="text-brand-neon">Feb 2026</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
