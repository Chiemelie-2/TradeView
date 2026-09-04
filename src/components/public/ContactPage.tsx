import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, createNewTicket, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const ctT = pageT.publicPages.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'investment' | 'deposit' | 'kyc' | 'technical'>('investment');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewTicket(subject, category, `From: ${name} (${email})\n\n${message}`);
    setSubmitted(true);
    showToast('Inquiry Forwarded', 'Your message has been dispatched to our private wealth desk.', 'success');
  };

  const offices = [
    { city: 'Geneva', address: 'Rue du Rhône 42, 1204 Genève, Switzerland', phone: '+41 22 819 4000', email: 'geneva@tradeverge.live' },
    { city: 'New York', address: '100 Wall Street, 28th Floor, New York, NY 10005, USA', phone: '+1 212 943 8800', email: 'ny@tradeverge.live' },
    { city: 'London', address: '1 Canada Square, Canary Wharf, London E14 5AA, UK', phone: '+44 20 7946 0912', email: 'london@tradeverge.live' },
    { city: 'Singapore', address: 'Marina Bay Financial Centre, Tower 3, Singapore 018982', phone: '+65 6718 2000', email: 'singapore@tradeverge.live' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
          {ctT.badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          {ctT.title}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {ctT.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-white">
            {ctT.formTitle}
          </h3>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-amber-500 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-white">{ctT.successTitle}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {ctT.successDesc.replace('{name}', name)}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-emerald-400 underline font-semibold cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">{ctT.fullNameLabel}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lord Harrington"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">{ctT.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@familyoffice.com"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">{ctT.subjectLabel}</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Institutional Allocation Inquiry"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">{ctT.categoryLabel}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="investment">Structured Investment Strategy</option>
                    <option value="deposit">Deposit & Depository Wire Assistance</option>
                    <option value="kyc">KYC & Institutional Onboarding</option>
                    <option value="technical">Technical Support & Security</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">{ctT.messageLabel}</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your inquiry or anticipated allocation timeline..."
                  className="w-full bg-[#050505] border border-white/10 rounded-xl p-3.5 text-gray-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{ctT.submitButton}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Global Desks */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-serif text-xl font-bold text-white mb-4">
            {ctT.desksTitle}
          </h3>
          <div className="space-y-3 text-xs">
            {offices.map((office, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-white text-sm">{office.city}</h4>
                  <span className="text-[10px] font-mono text-amber-400">Active Desk</span>
                </div>
                <p className="text-gray-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{office.address}</span>
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="font-mono">{office.phone}</span>
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="font-mono text-emerald-400">{office.email}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
