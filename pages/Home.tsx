
import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONTENT } from '../constants';
import { getProjects, getWritings } from '../utils/contentLoader';
import ContactModal from '../components/ContactModal';
import Toast from '../components/Toast';

const Home: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { hero, latestWork, insights, ctaSection } = SITE_CONTENT.home;
  const PROJECTS = getProjects();
  const POSTS = getWritings();

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
            {hero.titleStart} <br />
            <span className="text-brand-neon">{hero.titleHighlight}</span>
          </h1>
          <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/projects" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-neon text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all group shadow-xl shadow-brand-neon/10">
              {hero.ctaPrimary}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/writings" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-dark border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-all text-white">
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="px-6 mb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{latestWork.title}</h2>
            <p className="text-brand-muted text-lg max-w-xl">{latestWork.subtitle}</p>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-brand-neon font-bold group">
            All Projects
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <Link key={project.id} to="/projects" className="group block">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 img-blur-neon">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-neon transition-colors text-white">{project.title}</h3>
              <p className="text-brand-muted line-clamp-2">{project.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Writings Bento Grid Preview */}
      <section className="px-6 mb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{insights.title}</h2>
            <p className="text-brand-muted text-lg max-w-xl">{insights.subtitle}</p>
          </div>
          <Link to="/writings" className="inline-flex items-center gap-2 text-brand-neon font-bold group">
            All Writings
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {POSTS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
            {/* Main Featured Post - Large Card */}
            <Link
              to="/writings"
              className="md:col-span-2 md:row-span-2 bg-brand-card border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:border-brand-neon/20 transition-all"
            >
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 bg-brand-neon/10 text-brand-neon rounded-full text-xs font-bold uppercase tracking-widest border border-brand-neon/20">
                    {POSTS[0]?.category}
                  </span>
                  <div className="flex items-center gap-2 text-brand-muted text-xs font-bold">
                    <Calendar size={14} className="text-brand-neon" />
                    {POSTS[0]?.date}
                  </div>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white group-hover:text-brand-neon transition-colors leading-tight">
                  {POSTS[0]?.title}
                </h3>
                <p className="text-brand-muted text-lg max-w-xl mb-12 line-clamp-3">
                  {POSTS[0]?.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="flex items-center gap-2 text-brand-muted text-sm font-bold">
                    <Clock size={16} className="text-brand-neon" />
                    {POSTS[0]?.readTime}
                  </div>
                  <div className="h-px flex-1 bg-white/5"></div>
                  <div className="w-12 h-12 rounded-full bg-brand-neon text-brand-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity img-blur-neon">
                <img src={POSTS[0]?.imageUrl} className="w-full h-full object-cover" alt="" />
              </div>
            </Link>

            {/* Secondary Post - Smaller Card */}
            {POSTS[1] && (
              <Link
                to="/writings"
                className="bg-brand-card border border-white/5 rounded-[40px] p-8 group hover:border-brand-neon/20 transition-all flex flex-col"
              >
                <span className="text-brand-neon font-bold text-[10px] uppercase tracking-[0.2em] mb-4 block">
                  {POSTS[1]?.category}
                </span>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-brand-neon transition-colors line-clamp-2">
                  {POSTS[1]?.title}
                </h3>
                <p className="text-brand-muted text-sm line-clamp-2 mb-6">
                  {POSTS[1]?.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between text-[10px] font-bold text-brand-muted uppercase tracking-wider">
                  <span>{POSTS[1]?.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-brand-neon" />
                    <span>{POSTS[1]?.readTime}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Navigation CTA - Bento Card Style */}
            <Link
              to="/writings"
              className="bg-brand-neon rounded-[40px] p-8 group hover:scale-[0.98] transition-all flex flex-col justify-center items-center text-center overflow-hidden relative"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform">
                  <ChevronRight size={32} className="text-brand-neon" />
                </div>
                <h3 className="text-brand-dark font-black text-2xl mb-2 uppercase tracking-tighter">Explore All</h3>
                <p className="text-brand-dark/60 text-sm font-bold italic">{POSTS.length}+ Published Articles</p>
              </div>
              {/* Design patterns */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full flex flex-wrap gap-2 p-2">
                  {Array.from({length: 20}).map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-sm bg-brand-dark"></div>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ) : (
          /* Coming Soon State for Writings */
          <div className="bg-brand-card border border-white/5 rounded-[40px] p-12 md:p-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-brand-neon/10 blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-brand-dark border border-brand-neon/30 flex items-center justify-center mx-auto mb-8">
                <Clock size={32} className="text-brand-neon" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Coming <span className="text-brand-neon">Soon</span>
              </h3>

              <p className="text-brand-muted text-lg max-w-md mb-8 leading-relaxed">
                New writings are in the works. Stay tuned for insights on software, philosophy, and training.
              </p>

              <div className="inline-flex items-center gap-3 px-6 py-3 bg-brand-dark rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse"></div>
                <span className="text-sm text-brand-muted font-medium">Currently writing...</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-6 max-w-7xl mx-auto pb-32">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white">{ctaSection.title}</h2>
          <p className="text-brand-muted text-xl max-w-2xl mb-12 leading-relaxed">
            {ctaSection.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center justify-center gap-3 bg-brand-neon text-brand-dark px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-brand-neon/20"
            >
              {ctaSection.buttonPrimary}
              <ArrowRight size={24} strokeWidth={3} />
            </button>
            <button
              onClick={() => setShowToast(true)}
              className="flex items-center justify-center gap-3 bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-white/5 transition-all"
            >
              {ctaSection.buttonSecondary}
              <div className="w-8 h-8 rounded-full bg-white text-brand-dark flex items-center justify-center">
                <ArrowRight size={18} strokeWidth={3} />
              </div>
            </button>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        message="Call Booked!"
        description="I'll reach out to confirm the details shortly."
        duration={4000}
      />
    </div>
  );
};

export default Home;
