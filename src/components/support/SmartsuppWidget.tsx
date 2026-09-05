import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  ShieldCheck, 
  ChevronRight, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  Settings,
  ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { isSmartsuppConfigured, openSmartsuppChat, initSmartsupp } from '../../services/smartsuppService';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'agent' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export const SmartsuppWidget: React.FC = () => {
  const { user, t, currentRoute, setCurrentRoute, createNewTicket, openSmartsuppModal } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isConfigured = isSmartsuppConfigured();

  // Initialize Smartsupp when configured
  useEffect(() => {
    if (isConfigured) {
      initSmartsupp(user);
    }
  }, [isConfigured, user]);

  // Initial canned conversation conforming to TradeVerge specification pages 6-9
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'bot',
      text: `Welcome to TradeVerge.live Private Wealth Concierge. I am your verified automated client assistant. How may I assist your portfolio journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'How does KYC verification work?',
        'Payment & deposit instructions',
        'Withdrawal rules & settlement holds',
        'Custody & security architecture'
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle bot decision tree responses aligned with page 8 runbook
  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Formulate compliance-approved response
    setTimeout(() => {
      let botResponse = '';
      let suggestions: string[] | undefined = undefined;
      const lower = userText.toLowerCase();

      if (lower.includes('kyc') || lower.includes('verify') || lower.includes('identity')) {
        botResponse = `Compliance Policy: We can explain the required steps, but we cannot change a verification decision in chat. Please sign in to TradeVerge and open the KYC status page. If additional information is requested, submit it there. Never send identity documents or password secrets in this chat.`;
        suggestions = ['Open KYC Verification Portal', 'What documents are accepted?'];
      } else if (lower.includes('deposit') || lower.includes('fund') || lower.includes('payment') || lower.includes('bank') || lower.includes('crypto')) {
        botResponse = `Deposit Policy: A payment is credited only after TradeVerge verifies the banking wire or cryptocurrency on-chain transaction on the server. Please use the published deposit instructions in your portal, then submit your transaction hash or wire reference with proof. Never send private keys or seed phrases.`;
        suggestions = ['Go to Deposit Portal', 'View Payment Gateway Methods'];
      } else if (lower.includes('withdraw') || lower.includes('payout') || lower.includes('redemption')) {
        botResponse = `Withdrawal Policy: Withdrawal completion requires server verification, applicable security cooling-off holds, and documented review. We cannot accelerate or approve withdrawals via chat. Please submit via the Withdrawal portal with 2FA authorization.`;
        suggestions = ['Open Withdrawal Page', 'Create a Support Ticket'];
      } else if (lower.includes('security') || lower.includes('custody') || lower.includes('safe') || lower.includes('hack')) {
        botResponse = `Security Advisory: We will never ask for your password, one-time 2FA code, seed phrase, or private key. TradeVerge employs multi-signature cold storage, segregated bank reserves, and continuous ledger reconciliation.`;
        suggestions = ['View Security Details', 'Contact Desk'];
      } else if (lower.includes('ticket') || lower.includes('human') || lower.includes('agent') || lower.includes('operator')) {
        botResponse = `I have logged this request. If you need dedicated human review, our Operations Desk is active. Would you like to create an official authenticated support ticket?`;
        suggestions = ['Create Support Ticket', 'Return to Overview'];
      } else {
        botResponse = `Thank you for contacting TradeVerge Private Wealth. Your message has been logged under your session reference. You can explore structured investment plans, initiate verified deposits, or request an escalation ticket.`;
        suggestions = ['Browse Investment Plans', 'View Deposit Instructions', 'Open KYC Portal'];
      }

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 900);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === 'Open KYC Verification Portal') {
      setCurrentRoute('kyc');
      setIsOpen(false);
      return;
    }
    if (suggestion === 'Go to Deposit Portal' || suggestion === 'View Payment Gateway Methods') {
      setCurrentRoute('deposit');
      setIsOpen(false);
      return;
    }
    if (suggestion === 'Open Withdrawal Page') {
      setCurrentRoute('withdraw');
      setIsOpen(false);
      return;
    }
    if (suggestion === 'Create Support Ticket') {
      createNewTicket('Concierge Escalation Request', 'technical', 'Customer initiated inquiry from private wealth concierge widget.');
      setCurrentRoute('support');
      setIsOpen(false);
      return;
    }
    if (suggestion === 'Browse Investment Plans') {
      setCurrentRoute('investments');
      setIsOpen(false);
      return;
    }
    if (suggestion === 'View Security Details') {
      setCurrentRoute('security');
      setIsOpen(false);
      return;
    }
    handleSend(suggestion);
  };

  // Do not show on admin screens to comply with spec page 7: "The widget must not render inside admin pages"
  if (currentRoute === 'admin') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Concierge Launcher Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0a0a0a] hover:bg-neutral-900 text-white border border-amber-500/40 shadow-[0_8px_30px_rgba(0,0,0,0.6)] group transition-all cursor-pointer"
          aria-label="Open Private Wealth Concierge Chat"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-black font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-[#0a0a0a] animate-pulse"></span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-white tracking-wide flex items-center gap-1.5">
              <span>Client Concierge</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                isConfigured 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {isConfigured ? 'Smartsupp Active' : 'Live Concierge'}
              </span>
            </div>
            <div className="text-[10px] text-gray-400 flex items-center gap-1">
              <span>{isConfigured ? 'Live Chat Ready' : 'Smartsupp Key Pending'}</span>
            </div>
          </div>
        </motion.button>
      )}

      {/* Concierge Conversation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[92vw] sm:w-[380px] h-[540px] bg-[#050505] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="bg-[#0a0a0a] border-b border-white/10 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 border border-amber-400 flex items-center justify-center text-black font-serif font-bold text-sm">
                  TV
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>TradeVerge Concierge</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                    <span>{isConfigured ? 'Smartsupp Operator Active' : 'Automated Desk & Smartsupp Ready'}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openSmartsuppModal()}
                  className="p-1.5 rounded-lg text-amber-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Configure Smartsupp Key"
                >
                  <Key className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close Concierge"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Smartsupp Status & Key Banner */}
            <div className="bg-[#0a0a0a]/90 border-b border-white/10 px-3.5 py-2 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-gray-300">
                  {isConfigured ? 'Smartsupp Live Chat is connected' : 'Smartsupp Key: Pending your input'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => openSmartsuppModal()}
                className="text-[10px] text-amber-400 hover:underline font-mono flex items-center gap-1"
              >
                <span>{isConfigured ? 'Manage Key' : 'Add Key'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Compliance Banner */}
            <div className="bg-[#0a0a0a]/70 border-b border-white/10 px-3 py-1.5 text-[10px] text-gray-400 flex items-center justify-between">
              <span>Encrypted Session • Non-Sensitive Inquiry Channel</span>
              <span className="font-mono text-amber-400 text-[9px]">ID: #TV-CONC-89</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((m) => {
                const isUser = m.sender === 'user';
                return (
                  <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-start gap-2 max-w-[85%]">
                      {!isUser && (
                        <div className="w-6 h-6 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl leading-relaxed text-xs ${
                          isUser
                            ? 'bg-amber-500 text-black font-semibold rounded-tr-none shadow-md'
                            : 'bg-[#0a0a0a] border border-white/10 text-gray-200 rounded-tl-none shadow-sm'
                        }`}
                      >
                        <p>{m.text}</p>
                        <span className="block text-[9px] text-gray-500 mt-1 text-right font-mono">
                          {m.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Quick suggestion action pills */}
                    {m.suggestions && m.suggestions.length > 0 && (
                      <div className="mt-2 space-y-1 w-full pl-8">
                        {m.suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(sug)}
                            className="w-full text-left text-[11px] p-2 rounded-xl bg-[#0a0a0a] hover:bg-neutral-900 border border-white/10 text-amber-300 flex items-center justify-between transition-colors group"
                          >
                            <span>{sug}</span>
                            <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-amber-300" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-[11px] text-gray-400 italic pl-8">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce"></span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span>Concierge desk is preparing response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className="p-3 bg-[#0a0a0a] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t.chat.typeMessage}
                className="flex-1 bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold disabled:opacity-40 transition-colors"
                aria-label={t.chat.send}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
