import React from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { ArrowRight } from 'lucide-react';

export const EducationPage: React.FC = () => {
  const { setCurrentRoute, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const eduT = pageT.publicPages.education;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
          {eduT.badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {eduT.title}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {eduT.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {eduT.articles.map((art, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">{art.category}</span>
                <span className="text-gray-500">{art.readTime}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {art.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {art.desc}
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('investments')}
              className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 pt-3 border-t border-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <span>{eduT.readMore}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
