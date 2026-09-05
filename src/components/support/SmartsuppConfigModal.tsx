import React, { useState } from 'react';
import { 
  getSmartsuppKey, 
  setCustomSmartsuppKey, 
  isSmartsuppConfigured, 
  initSmartsupp, 
  openSmartsuppChat 
} from '../../services/smartsuppService';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Key, CheckCircle2, AlertCircle, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface SmartsuppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartsuppConfigModal: React.FC<SmartsuppConfigModalProps> = ({ isOpen, onClose }) => {
  const { user, showToast } = useApp();
  const [apiKey, setApiKey] = useState(() => getSmartsuppKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const isConfigured = isSmartsuppConfigured();

  const handleSaveKey = () => {
    setCustomSmartsuppKey(apiKey);
    const configured = Boolean(apiKey.trim() && apiKey.trim().length > 5);
    
    if (configured) {
      initSmartsupp(user);
      showToast(
        'Smartsupp Key Saved',
        'Smartsupp live chat script has been initialized and connected.',
        'success'
      );
    } else {
      showToast(
        'Smartsupp Key Cleared',
        'Falling back to native automated concierge desk.',
        'info'
      );
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTestChat = () => {
    const success = openSmartsuppChat();
    if (!success) {
      initSmartsupp(user);
      setTimeout(() => {
        const opened = openSmartsuppChat();
        if (!opened) {
          showToast(
            'Smartsupp Initializing',
            'Smartsupp script is loading. The chat box will appear in the bottom corner.',
            'info'
          );
        }
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0d0d0d] border border-white/20 rounded-2xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#050505] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm">Smartsupp Live Chat Integration</h3>
                {isConfigured ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Live Key Connected
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Key Pending
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-xs">
                Real-time human operator chat for TradeVerge private wealth investors.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-gray-300">
          
          {/* Status Box */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Live Customer Support Protocol
              </span>
              <span className="text-gray-400 font-mono text-[10px]">smartsupp.com</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              When you add your Smartsupp Chat Key, the real-time Smartsupp live widget loads directly on your screen. You can add the key below or declare it via <code className="text-amber-400 font-mono">VITE_SMARTSUPP_KEY</code> in your environment variables or Settings.
            </p>
          </div>

          {/* Smartsupp Key Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                Smartsupp Chat Key
              </span>
              <span className="text-[10px] text-gray-400 font-mono">VITE_SMARTSUPP_KEY</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="e.g. 46a89c89b70b542cf9a..."
                className="flex-1 bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500 font-mono"
              />
              <button
                type="button"
                onClick={handleSaveKey}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-md"
              >
                {savedSuccess ? 'Saved!' : 'Save Key'}
              </button>
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="text-[10px] text-gray-400">
                Stored securely in your local environment.
              </p>
              <a 
                href="https://www.smartsupp.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Get key at smartsupp.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="p-4 rounded-xl bg-[#050505] border border-white/10 space-y-2.5">
            <h4 className="text-white font-semibold text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              How to obtain your Smartsupp Key:
            </h4>
            <ol className="list-decimal list-inside text-gray-400 text-[11px] space-y-1 leading-relaxed">
              <li>Log in to your account at <strong className="text-gray-200">smartsupp.com</strong>.</li>
              <li>Go to <strong className="text-gray-200">Settings &rarr; Chat box &rarr; Chat code</strong>.</li>
              <li>Copy the key value from <code className="text-amber-400 font-mono text-[10px]">_smartsupp.key = 'YOUR_KEY'</code>.</li>
              <li>Paste it into the field above and click <strong className="text-amber-400">Save Key</strong>.</li>
            </ol>

            {isConfigured && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleTestChat}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open Live Smartsupp Chat Window</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#050505] flex items-center justify-between">
          <span className="text-[10px] text-gray-500 font-mono">
            Provider: Smartsupp.com Live Chat
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
