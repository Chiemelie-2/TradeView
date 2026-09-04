import React from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { ShieldCheck, Landmark, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const abT = pageT.publicPages.about;

  const icons = [
    <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    <Landmark className="w-5 h-5 text-amber-500" />,
    <Award className="w-5 h-5 text-blue-400" />
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
          {abT.badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {abT.title}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {abT.subtitle}
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {abT.pillars.map((pillar, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              {icons[idx] || <ShieldCheck className="w-5 h-5 text-amber-500" />}
            </div>
            <h3 className="font-serif text-xl font-bold text-white">{pillar.title}</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Leadership Team */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            Executive Governance
          </span>
          <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
            {abT.leadershipTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {abT.leadership.map((member, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-[#050505] border border-amber-500/40 flex items-center justify-center font-serif font-bold text-lg text-amber-300 mb-3">
                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <h4 className="font-serif text-base font-bold text-white">{member.name}</h4>
              <span className="text-[11px] font-mono text-emerald-400 block">{member.role}</span>
              <p className="text-[11px] text-gray-400 leading-relaxed pt-2 border-t border-white/10">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
