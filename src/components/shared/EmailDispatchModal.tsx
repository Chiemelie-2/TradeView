import React, { useState } from 'react';
import { DispatchedEmail } from '../../services/emailService';
import { Mail, CheckCircle2, ShieldCheck, X, Copy, ExternalLink, RefreshCw } from 'lucide-react';

interface EmailDispatchModalProps {
  email: DispatchedEmail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmailDispatchModal: React.FC<EmailDispatchModalProps> = ({ email, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'source' | 'meta'>('preview');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !email) return null;

  const handleCopyToken = () => {
    navigator.clipboard.writeText(email.verificationToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0a0a0a] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#050505]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm">Automated Email Dispatched</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Delivered to Inbox
                </span>
              </div>
              <p className="text-gray-400 text-xs">
                To: <span className="text-amber-400 font-mono">{email.recipientEmail}</span>
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action / Quick Info Banner */}
        <div className="bg-[#0f0f0f] border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-300 font-mono text-[11px]">
            <span className="text-gray-500">Account Ref:</span>
            <span className="text-white font-bold">{email.depositoryAccountId}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">Security Token:</span>
            <span className="text-emerald-400 font-bold">{email.verificationToken}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyToken}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-mono transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>{copied ? 'Copied Token' : 'Copy Code'}</span>
            </button>
            <div className="flex bg-[#050505] p-0.5 rounded-lg border border-white/10">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  activeTab === 'preview' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Rendered View
              </button>
              <button
                onClick={() => setActiveTab('meta')}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  activeTab === 'meta' ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Audit Trace
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#050505]">
          {activeTab === 'preview' && (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-black p-4">
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: email.htmlContent }}
              />
            </div>
          )}

          {activeTab === 'meta' && (
            <div className="space-y-3 font-mono text-xs text-gray-300">
              <div className="p-3 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-2">
                <div className="text-amber-400 font-bold uppercase text-[10px] tracking-wider">MTA Delivery Envelope</div>
                <div><span className="text-gray-500">Subject:</span> {email.subject}</div>
                <div><span className="text-gray-500">Recipient:</span> {email.recipientName} &lt;{email.recipientEmail}&gt;</div>
                <div><span className="text-gray-500">Dispatched At:</span> {new Date(email.sentAt).toUTCString()}</div>
                <div><span className="text-gray-500">Security Signature:</span> {email.securityHash}</div>
                <div><span className="text-gray-500">SMTP Server:</span> smtp.tradeverge.live:587 (TLSv1.3 Encrypted)</div>
                <div><span className="text-gray-500">DKIM / SPF:</span> PASS (p=reject, d=tradeverge.live)</div>
              </div>

              <div className="p-3 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-1">
                <div className="text-amber-400 font-bold uppercase text-[10px] tracking-wider">Plaintext Fallback Body</div>
                <pre className="text-[11px] text-gray-400 whitespace-pre-wrap leading-relaxed">{email.plainText}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#050505] flex items-center justify-between">
          <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            Verified Google Email & Depository Ledger Registration
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all"
          >
            Acknowledge & Proceed
          </button>
        </div>

      </div>
    </div>
  );
};
