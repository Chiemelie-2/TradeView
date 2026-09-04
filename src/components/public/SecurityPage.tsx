import React from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { KeyRound, Landmark, Database, Eye, AlertTriangle } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const { language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const secT = pageT.publicPages.security;

  const icons = [
    <KeyRound className="w-5 h-5 text-emerald-400" />,
    <Landmark className="w-5 h-5 text-amber-500" />,
    <Database className="w-5 h-5 text-blue-400" />,
    <Eye className="w-5 h-5 text-rose-400" />
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
          {secT.badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {secT.title}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {secT.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secT.cards.map((card, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              {icons[idx] || <KeyRound className="w-5 h-5 text-amber-500" />}
            </div>
            <h3 className="font-serif text-xl font-bold text-white">{card.title}</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-[#050505] border border-white/10 flex items-start gap-3 text-xs text-gray-400">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Authoritative Security Disclosure: </strong>
          {secT.disclosure}
        </div>
      </div>
    </div>
  );
};
