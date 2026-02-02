
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT } from '../constants';
import { getProjects } from '../utils/contentLoader';
import ContactModal from '../components/ContactModal';

const Projects: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const content = SITE_CONTENT.projectsPage;
  const PROJECTS = getProjects();

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{content.title}</h1>
          <p className="text-brand-muted text-xl max-w-2xl">
            {content.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className={`group cursor-pointer ${idx % 2 === 1 ? 'md:mt-20' : ''}`}>
              <div className="relative aspect-[16/10] rounded-[48px] overflow-hidden mb-8 border border-white/5">
                <div className="absolute inset-0 img-blur-neon">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="px-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-brand-card rounded-full text-xs font-bold text-brand-neon border border-brand-neon/20">{tag}</span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold mb-3 flex items-center gap-2 group-hover:text-brand-neon transition-colors">
                  {project.title}
                  <ArrowUpRight size={24} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </h3>
                <p className="text-brand-muted text-lg leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section Preview */}
        <div className="mt-40 bg-brand-card rounded-[60px] p-12 md:p-24 text-center border border-white/5 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">{content.cta.title} <br /> <span className="text-brand-neon">{content.cta.highlight}</span></h2>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-brand-neon text-brand-dark px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl"
            >
              {content.cta.button}
            </button>
          </div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-brand-neon/10 rounded-full blur-[100px]"></div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default Projects;
