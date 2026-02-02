
import React from 'react';
import { Mail, MapPin, Briefcase } from 'lucide-react';
import { SITE_CONTENT } from '../constants';

const About: React.FC = () => {
  const content = SITE_CONTENT.about;
  const global = SITE_CONTENT.global;

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 items-start">
          <div className="col-span-1">
            <div className="aspect-square rounded-[40px] overflow-hidden bg-brand-card border border-white/10 mb-6">
              <img src="/assets/about-me.jpg" alt={global.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-muted">
                <MapPin size={18} className="text-brand-neon" />
                <span>{global.location}</span>
              </div>
              <div className="flex items-center gap-3 text-brand-muted">
                <Mail size={18} className="text-brand-neon" />
                <span>{global.email}</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">{content.title}</h1>
            <p className="text-xl text-brand-muted mb-6 leading-relaxed">
              {content.intro}
            </p>
            <p className="text-brand-muted mb-8 leading-relaxed">
              {content.bio}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              {content.stats.map((stat, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-brand-card border border-white/5">
                  <h3 className="text-3xl font-bold text-brand-neon mb-1">{stat.value}</h3>
                  <p className="text-sm text-brand-muted font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
              <div className="p-6 rounded-3xl bg-brand-card border border-white/5 flex items-center justify-center">
                <img src="/assets/logo-badge.svg" alt="Badge" className="h-16 w-auto" />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {content.skills.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-brand-card rounded-full text-sm text-brand-muted border border-white/5 hover:border-brand-neon hover:text-brand-neon transition-all">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
            <Briefcase size={28} className="text-brand-neon" />
            Professional Journey
          </h2>
          <div className="space-y-8">
            {content.journey.map((exp, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-brand-neon mt-2 ring-4 ring-brand-neon/20"></div>
                  <div className="flex-1 w-px bg-white/10 mt-2"></div>
                </div>
                <div className="pb-8">
                  <span className="text-brand-neon font-bold text-sm mb-1 block">{exp.year}</span>
                  <h3 className="text-xl font-bold group-hover:text-brand-neon transition-colors">{exp.role}</h3>
                  <span className="text-brand-muted text-sm font-medium mb-2 block">{exp.company}</span>
                  <p className="text-brand-muted leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
