import React, { useState } from 'react';
import { 
  getGoogleTranslateKey, 
  setCustomGoogleTranslateKey, 
  isGoogleTranslateConfigured, 
  translateText 
} from '../../services/googleTranslate';
import { useApp } from '../../context/AppContext';
import { Globe, Key, CheckCircle2, AlertCircle, X, Sparkles, Languages, ArrowRight } from 'lucide-react';

interface GoogleTranslateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleTranslateModal: React.FC<GoogleTranslateModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, showToast } = useApp();
  const [apiKey, setApiKey] = useState(() => getGoogleTranslateKey());
  const [testInput, setTestInput] = useState('Institutional digital asset depository with segregated reserves and deterministic yield.');
  const [testOutput, setTestOutput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const isConfigured = isGoogleTranslateConfigured();

  const handleSaveKey = () => {
    setCustomGoogleTranslateKey(apiKey);
    setSavedSuccess(true);
    showToast(
      'Google Cloud Translation Key Updated',
      apiKey.trim() 
        ? 'Google Cloud Translation API v2 is now configured for dynamic website translation.' 
        : 'Google Cloud Translation key removed. Falling back to built-in institutional translation dictionaries.',
      'success'
    );
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTestTranslate = async () => {
    if (!testInput.trim()) return;
    setIsTranslating(true);
    try {
      const translated = await translateText(testInput, language, 'en');
      setTestOutput(translated);
    } catch {
      setTestOutput(testInput);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0d0d0d] border border-white/20 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#050505] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm">Google Cloud Translation Engine</h3>
                {isConfigured ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Live Cloud API Connected
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Key Pending (Native Dictionary Active)
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-xs">
                Full-site neural machine translation across 10 global financial jurisdictions.
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

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-gray-300">
          
          {/* Status Box */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-amber-400" />
                Active Locale: <strong className="uppercase text-amber-400 font-mono">[{language}]</strong>
              </span>
              <span className="text-gray-400">10 Languages Supported</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              When a Google Cloud Translation API key is provided, on-the-fly machine translation seamlessly translates dynamic inputs, ticket inquiries, transaction notes, and live strategy alerts. When no key is set yet, TradeVerge automatically renders comprehensive institutional translations from our verified 10-language dictionaries.
            </p>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                Google Cloud Translation API Key (v2)
              </span>
              <span className="text-[10px] text-gray-400 font-mono">VITE_GOOGLE_TRANSLATE_API_KEY</span>
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... (leave blank to use built-in dictionaries)"
                className="flex-1 bg-[#050505] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 font-mono"
              />
              <button
                type="button"
                onClick={handleSaveKey}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-md"
              >
                {savedSuccess ? 'Saved!' : 'Save Key'}
              </button>
            </div>
            <p className="text-[10px] text-gray-400">
              You can add this key in AI Studio Settings or enter it above. It will be securely stored in your local browser sandbox.
            </p>
          </div>

          {/* Live Translation Test Bench */}
          <div className="p-4 rounded-xl bg-[#050505] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Live Translation Test Bench
              </span>
              <span className="text-gray-400 text-[10px]">Source: EN &rarr; Target: {language.toUpperCase()}</span>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Source Text (English)</label>
              <textarea
                rows={2}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={handleTestTranslate}
              disabled={isTranslating}
              className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>{isTranslating ? 'Translating via Google Cloud...' : 'Execute Machine Translation'}</span>
            </button>

            {testOutput && (
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs">
                <div className="text-[10px] text-blue-400 font-mono uppercase mb-0.5">Google Cloud Output:</div>
                <div className="leading-relaxed">{testOutput}</div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#050505] flex items-center justify-between">
          <span className="text-[10px] text-gray-500 font-mono">
            Endpoint: translation.googleapis.com/language/translate/v2
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
