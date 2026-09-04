import React from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';
import { FileText, Download } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { user, showToast, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const docT = pageT.investorPages.documents;

  const documents = [
    {
      title: 'Audited Annual Custody Statement (2025-2026)',
      type: 'Independent CPA Attestation',
      date: 'Aug 15, 2026',
      size: '1.8 MB'
    },
    {
      title: 'Institutional Depository Segregation Certificate',
      type: 'Tier 1 Banking Custody',
      date: 'Aug 01, 2026',
      size: '840 KB'
    },
    {
      title: 'Accredited Investor Subscription & Mandate Agreement',
      type: 'Legal Contract',
      date: 'Jul 10, 2026',
      size: '3.2 MB'
    },
    {
      title: 'Tier 2 KYC Identification Clearance Dossier',
      type: 'Compliance Record',
      date: 'Jun 28, 2026',
      size: '620 KB'
    },
    {
      title: 'Quarterly Yield Distribution & Withholding Tax Summary',
      type: 'Tax & Ledger Statement',
      date: 'Jun 30, 2026',
      size: '1.1 MB'
    }
  ];

  const handleDownload = (docTitle: string) => {
    showToast('Document Downloaded', `Encrypted PDF for "${docTitle}" saved.`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
          {docT.badge}
        </span>
        <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
          {docT.title}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          {docT.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-amber-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-[#050505] border border-white/10 text-amber-400 group-hover:text-amber-300 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                  {doc.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-gray-500 mt-1">
                  <span className="text-amber-400">{doc.type}</span>
                  <span>•</span>
                  <span>Issued: {doc.date}</span>
                  <span>•</span>
                  <span>Size: {doc.size}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(doc.title)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#050505] border border-white/10 hover:border-amber-500 text-white text-xs font-semibold self-start sm:self-auto transition-all cursor-pointer shadow"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{docT.downloadButton}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
