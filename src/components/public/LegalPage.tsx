import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { pageTranslations } from '../../i18n/pageTranslations';

export const LegalPage: React.FC = () => {
  const { language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const legT = pageT.publicPages.legal;

  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'aml' | 'risk'>('terms');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
          {legT.badge}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {legT.title}
        </h1>
        <p className="text-gray-300 text-sm mt-1">
          {legT.lastUpdated}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('terms')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'terms' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {legT.tabs.terms}
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'privacy' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {legT.tabs.privacy}
        </button>
        <button
          onClick={() => setActiveTab('aml')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'aml' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {legT.tabs.aml}
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'risk' ? 'border-amber-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          {legT.tabs.risk}
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 text-xs text-gray-300 space-y-4 leading-relaxed">
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">1. Core Platform Terms</h3>
            <p>
              By accessing TradeVerge.live, you acknowledge that the frontend interface is display-only. The only authoritative sources of financial truth are backend services, the balanced immutable ledger, verified banking provider statements, and cryptographic on-chain consensus.
            </p>
            <h4 className="font-semibold text-white">2. Eligibility & Accredited Investor Status</h4>
            <p>
              Platform services are offered exclusively to Qualified Purchasers, Accredited Investors, and institutional family offices in permitted jurisdictions. Services are not offered to persons resident in jurisdictions where digital structured asset offerings are prohibited by law.
            </p>
            <h4 className="font-semibold text-white">3. Segregated Depository Custody</h4>
            <p>
              All investor capital is held off-balance-sheet in segregated depository accounts. TradeVerge maintains a strict non-rehypothecation mandate. Capital allocated to specific structured strategies is routed strictly in accordance with published investment mandates.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">Privacy & Data Governance</h3>
            <p>
              TradeVerge operates under strict GDPR and Swiss Federal Act on Data Protection (FADP) standards. We collect identity documents, transaction records, and communication histories exclusively for compliance, regulatory reporting, and safeguarding.
            </p>
            <h4 className="font-semibold text-white">Data Encryption & Storage</h4>
            <p>
              All customer personal data and identity verification documents are encrypted in transit via TLS 1.3 and at rest via AES-256 with key sharding across independent hardware security modules.
            </p>
          </div>
        )}

        {activeTab === 'aml' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">Anti-Money Laundering (AML) & Sanctions Framework</h3>
            <p>
              TradeVerge maintains zero tolerance for illicit financing. Every investor must undergo Know-Your-Customer (KYC) verification, Politically Exposed Persons (PEP) screening, and adverse media clearance before any capital allocation or withdrawal is permitted.
            </p>
            <h4 className="font-semibold text-white">Depository Source of Funds Verification</h4>
            <p>
              Manual bank transfers and cryptocurrency transactions are subjected to algorithmic chain analytics (TRM Labs / Elliptic) and depository statement reconciliation. Transactions flagged with sanctions exposure will be frozen pending regulatory notification.
            </p>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white">Institutional Risk Disclosure Statement</h3>
            <p className="p-3.5 rounded-xl bg-[#050505] border border-white/10 text-amber-500 font-mono text-[11px]">
              WARNING: Structured digital investments and alternative credit strategies carry risk of loss of principal. Past performance does not guarantee future results.
            </p>
            <p>
              Target APYs and projected return figures are computed based on quantitative backtesting, sovereign yield curve projections, and historical spread data. Market volatility, liquidity freezes, interest rate shifts, and counterparty defaults could affect ultimate net returns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
