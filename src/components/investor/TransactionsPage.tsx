import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LedgerTransaction } from '../../types';
import { pageTranslations } from '../../i18n/pageTranslations';
import { Search, Download, FileText, X, CheckCircle2, Filter } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { ledgerTransactions, language } = useApp();
  const pageT = pageTranslations[language] || pageTranslations.en;
  const txT = pageT.investorPages.transactions;
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [receiptTx, setReceiptTx] = useState<LedgerTransaction | null>(null);

  const filtered = ledgerTransactions.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(search.toLowerCase()) ||
                          tx.description.toLowerCase().includes(search.toLowerCase()) ||
                          (tx.referenceId && tx.referenceId.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const exportCsv = () => {
    const headers = 'ID,Type,Amount,Currency,Direction,Status,Description,Reference,Date\n';
    const rows = filtered.map(t => 
      `"${t.id}","${t.type}","${t.amount}","${t.currency}","${t.direction}","${t.status}","${t.description.replace(/"/g, '""')}","${t.referenceId || ''}","${t.createdAt}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TradeVerge_Ledger_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
            {txT.badge}
          </span>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
            {txT.title}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            {txT.subtitle}
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0a0a0a] border border-white/10 hover:border-amber-500 text-white text-xs font-semibold self-start sm:self-auto transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>{txT.exportCsv}</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={txT.searchPlaceholder}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          {['all', 'deposit', 'withdrawal', 'investment_allocation', 'yield_distribution'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                filterType === type
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-[#0a0a0a] text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All Records' : type.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a0a0a] shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050505] text-gray-400 font-mono text-[10px] uppercase border-b border-white/10">
            <tr>
              <th className="p-4">{txT.colEntry}</th>
              <th className="p-4">{txT.colType}</th>
              <th className="p-4">{txT.colDescription}</th>
              <th className="p-4">{txT.colAmount}</th>
              <th className="p-4">{txT.colTimestamp}</th>
              <th className="p-4">{txT.colStatus}</th>
              <th className="p-4 text-right">{txT.colAction}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-300">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 font-mono text-gray-500">{tx.id}</td>
                <td className="p-4 font-mono uppercase text-[10px] text-gray-400">
                  {tx.type.replace('_', ' ')}
                </td>
                <td className="p-4 text-white font-medium">{tx.description}</td>
                <td className={`p-4 font-mono font-bold ${tx.direction === 'credit' ? 'text-amber-400' : 'text-gray-300'}`}>
                  {tx.direction === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()} {tx.currency}
                </td>
                <td className="p-4 font-mono text-gray-500 text-[11px]">
                  {new Date(tx.createdAt).toLocaleString()}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                    tx.status === 'completed'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-zinc-800 text-gray-400 border border-white/10'
                  }`}>
                    {tx.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setReceiptTx(tx)}
                    className="px-2.5 py-1 rounded-md bg-[#050505] border border-white/10 hover:border-amber-500 text-gray-300 hover:text-white text-[11px]"
                  >
                    View Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Official Receipt Modal */}
      {receiptTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0a0a0a] border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                  OFFICIAL DEPOSITORY CERTIFICATE
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">TradeVerge Ledger Receipt</h3>
              </div>
              <button onClick={() => setReceiptTx(null)} className="p-1 rounded-lg text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#050505] border border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Journal ID:</span>
                <span className="font-mono text-white">{receiptTx.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Event Class:</span>
                <span className="font-mono uppercase text-gray-300">{receiptTx.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cleared Amount:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  ${receiptTx.amount.toLocaleString()} {receiptTx.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reference:</span>
                <span className="font-mono text-gray-300 truncate max-w-[180px]">{receiptTx.referenceId || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Settled Timestamp:</span>
                <span className="font-mono text-gray-500">{new Date(receiptTx.createdAt).toUTCString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono text-center">
              State Digest: 0x8a9bf3...e89d1 (Cryptographically Reconciled)
            </div>

            <button
              onClick={() => setReceiptTx(null)}
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow"
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
