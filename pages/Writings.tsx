
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Search, ArrowRight, Clock, Calendar, Zap, Brain, Code, X, List, Share2 } from 'lucide-react';
import { SITE_CONTENT } from '../constants';
import { getWritings } from '../utils/contentLoader';
import { Post } from '../types';

const categoryIcons: Record<string, React.ReactNode> = {
  'Training': <Zap size={14} />,
  'Philosophy': <Brain size={14} />,
  'Tech': <Code size={14} />,
};

const WritingModal: React.FC<{ post: Post; onClose: () => void }> = ({ post, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Extract headings from markdown content for table of contents
  const headingMatches = post.rawContent.match(/^## .+$/gm) || [];
  const headings = headingMatches.map(h => h.replace('## ', ''));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-6 lg:p-10">
      <div
        className="absolute inset-0 bg-brand-dark/95 backdrop-blur-2xl"
        onClick={onClose}
      ></div>

      <div className="relative w-full h-full max-w-7xl bg-brand-card rounded-none md:rounded-[60px] border-none md:border border-white/5 overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        {/* Modal Header */}
        <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center pointer-events-none">
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:border-brand-neon hover:text-brand-neon transition-all pointer-events-auto"
          >
            <X size={24} />
          </button>
          <div className="flex gap-3 pointer-events-auto">
             <button className="w-12 h-12 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:border-brand-neon transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero Header */}
          <div className="relative h-[60vh] min-h-[400px]">
            <div className="absolute inset-0 img-blur-neon">
              <img
                src={post.imageUrl}
                className="w-full h-full object-cover"
                alt={post.title}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/20 to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-20">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-4 py-1.5 bg-brand-neon text-brand-dark rounded-full text-xs font-black flex items-center gap-2">
                    {categoryIcons[post.category]}
                    {post.category}
                  </div>
                  <div className="text-white/60 text-xs font-bold flex items-center gap-2">
                    <Calendar size={14} className="text-brand-neon" />
                    {post.date}
                  </div>
                  <div className="text-white/60 text-xs font-bold flex items-center gap-2">
                    <Clock size={14} className="text-brand-neon" />
                    {post.readTime}
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-4">
                  {post.title}
                </h1>
                <p className="text-brand-muted text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>

          {/* Article Content Grid */}
          <div className="px-8 md:px-16 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Table of Contents - Desktop Only */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-0 h-fit">
                <div className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest mb-8">
                  <List size={18} className="text-brand-neon" />
                  Table of Contents
                </div>
                <nav className="space-y-4">
                  {headings.map((heading, i) => (
                    <a
                      key={i}
                      href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-brand-muted hover:text-brand-neon transition-colors text-sm font-bold leading-tight border-l-2 border-white/5 pl-4 py-1"
                    >
                      {heading}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Main Content Body */}
              <article className="lg:col-span-9 max-w-3xl prose-custom">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => {
                      const text = String(children);
                      const id = text.toLowerCase().replace(/\s+/g, '-');
                      return <h2 id={id} className="text-3xl font-bold mt-16 mb-6 text-white leading-tight">{children}</h2>;
                    },
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mt-10 mb-4 text-brand-neon">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-brand-muted text-lg leading-relaxed mb-6 font-medium">{children}</p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-brand-neon pl-8 my-12 italic">
                        <div className="text-2xl text-white font-medium leading-relaxed">{children}</div>
                      </blockquote>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-4 mb-8">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex gap-4 items-start group">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-neon mt-2.5 shrink-0"></div>
                        <span className="text-brand-muted text-lg leading-relaxed">{children}</span>
                      </li>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-brand-neon hover:underline">{children}</a>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-bold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    code: ({ children }) => (
                      <code className="bg-brand-dark px-2 py-1 rounded text-brand-neon text-sm">{children}</code>
                    ),
                  }}
                >
                  {post.rawContent}
                </ReactMarkdown>

                {/* Article Footer */}
                <div className="mt-24 pt-12 border-t border-white/5">
                   <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 bg-brand-dark rounded-[40px] border border-white/5">
                      <div className="text-center md:text-left">
                        <h4 className="text-2xl font-bold text-white mb-2">Did you find this insightful?</h4>
                        <p className="text-brand-muted">Stay tuned for more deep dives into human systems.</p>
                      </div>
                      <button className="bg-brand-neon text-brand-dark px-8 py-3 rounded-full font-black hover:scale-105 transition-transform">
                        Share Article
                      </button>
                   </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Writings: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const content = SITE_CONTENT.writingsPage;
  const categories = ['All', 'Training', 'Philosophy', 'Tech'];

  const POSTS = getWritings();

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Check if there are no posts at all
  const hasNoPosts = POSTS.length === 0;

  return (
    <div className="pt-32 pb-32 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">{content.title}</h1>
          <p className="text-brand-muted text-xl max-w-xl">
            {content.subtitle}
          </p>

          {!hasNoPosts && (
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mt-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                        activeCategory === cat
                          ? 'bg-brand-neon text-brand-dark border-brand-neon'
                          : 'bg-brand-card text-brand-muted border-white/5 hover:border-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-brand-card border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm focus:border-brand-neon outline-none transition-all text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Coming Soon State */}
        {hasNoPosts ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative mb-12">
              {/* Animated glow rings */}
              <div className="absolute inset-0 w-40 h-40 rounded-full bg-brand-neon/20 blur-3xl animate-pulse"></div>
              <div className="absolute inset-4 w-32 h-32 rounded-full bg-brand-neon/10 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

              {/* Icon container */}
              <div className="relative w-40 h-40 rounded-full bg-brand-card border border-white/10 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-brand-dark border border-brand-neon/30 flex items-center justify-center">
                  <Code size={40} className="text-brand-neon" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Coming <span className="text-brand-neon">Soon</span>
            </h2>

            <p className="text-brand-muted text-xl text-center max-w-md mb-8 leading-relaxed">
              New writings are in the works. Check back soon for insights on software, philosophy, and training.
            </p>

            <div className="flex items-center gap-3 px-6 py-3 bg-brand-card rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse"></div>
              <span className="text-sm text-brand-muted font-medium">Currently writing...</span>
            </div>
          </div>
        ) : (
          /* Uniform Grid of Posts */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  <div className="aspect-[16/10] rounded-[40px] overflow-hidden mb-8 bg-brand-card border border-white/5 relative shadow-2xl">
                    <div className="absolute inset-0 img-blur-neon">
                      <img
                        src={post.imageUrl}
                        className="w-full h-full object-cover"
                        alt={post.title}
                      />
                    </div>
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-brand-dark/80 backdrop-blur-md rounded-full text-[10px] font-bold text-brand-neon flex items-center gap-2 border border-white/5 z-10">
                      {categoryIcons[post.category]}
                      {post.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-brand-muted font-bold uppercase tracking-widest mb-4 px-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-brand-neon" />
                      <span>{post.date}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-brand-neon" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-neon transition-colors leading-snug px-2">
                    {post.title}
                  </h3>

                  <p className="text-brand-muted mb-8 line-clamp-2 leading-relaxed flex-grow px-2">
                    {post.excerpt}
                  </p>

                  <div className="px-2 mt-auto">
                    <button className="flex items-center gap-2 text-sm font-bold group/btn text-white hover:text-brand-neon transition-colors">
                      Continue Reading
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-brand-neon group-hover/btn:text-brand-dark transition-all">
                        <ArrowRight size={14} />
                      </div>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-brand-card/30 rounded-[40px] border border-dashed border-white/10">
                <p className="text-brand-muted text-xl">No articles found matching your criteria.</p>
                <button
                  onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                  className="mt-6 text-brand-neon font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Reading Modal */}
      {selectedPost && (
        <WritingModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default Writings;
