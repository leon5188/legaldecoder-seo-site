import React, { useState, useEffect, useRef } from 'react';
import { Message } from './types';
import BottomNav from './BottomNav';

interface ChatScreenProps {
  chatMessages: Message[];
  isTyping: boolean;
  suggestions: string[];
  onSendMessage: (text: string) => void;
  isSubscribed: boolean;
  handleScrollToPaywall: () => void;
  docName: string;
  activeScreenIndex: number;
  setActiveScreenIndex: (index: number) => void;
  hasUploaded: boolean;
}

export default function ChatScreen({
  chatMessages,
  isTyping,
  suggestions,
  onSendMessage,
  isSubscribed,
  handleScrollToPaywall,
  docName,
  activeScreenIndex,
  setActiveScreenIndex,
  hasUploaded
}: ChatScreenProps) {
  const [chatInput, setChatInput] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 每次有新消息或状态变动时，滚动到底部
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    onSendMessage(chatInput.trim());
    setChatInput('');
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#F4F2EB] text-slate-900 h-full">
      
      {/* Header: Document / Current context indicator */}
      <div className="px-4 py-3 bg-[#EAE7DF] border-b-2 border-slate-900 flex items-center justify-between">
        <div className="text-left min-w-0 flex-1">
          <h4 className="text-xs font-black text-slate-900 leading-tight">Ask AI Assistant</h4>
          <span className="text-[9px] text-slate-600 font-mono tracking-tight truncate max-w-[170px] block mt-0.5 font-bold">
            Doc: {docName}
          </span>
        </div>
        
        {/* Connection Status Indicator */}
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
          <span className="text-[9px] font-mono text-slate-700 font-black">AI Active</span>
        </div>
      </div>

      {/* CHAT BUBBLE FEED */}
      <div className="flex-1 p-3 overflow-y-auto no-scrollbar space-y-3 bg-[#F4F2EB] flex flex-col justify-start">
        
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] transition-all duration-200 ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <div className={`p-3 rounded-2xl text-[11px] leading-relaxed shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] ${
                isUser 
                  ? 'bg-slate-900 text-white rounded-br-none border-2 border-slate-900' 
                  : 'bg-white text-slate-900 rounded-bl-none font-black border-2 border-slate-900'
              }`}>
                <p className="whitespace-pre-line text-left">{msg.text}</p>
                
                {/* Section Link Badge */}
                {!isUser && msg.badge && (
                  <div className="mt-2 flex items-center">
                    <span className="px-1.5 py-0.5 rounded bg-[#EAFBFF] text-cyan-800 border-2 border-slate-900 font-black text-[8px] uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                      Ref: {msg.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Simulated Typing Indicator */}
        {isTyping && (
          <div className="flex flex-col max-w-[80%] self-start items-start animate-pulse">
            <div className="p-3 bg-white text-slate-700 rounded-2xl rounded-bl-none border-2 border-slate-900 flex items-center space-x-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        
        {/* Reference point for scrolling to bottom */}
        <div ref={chatEndRef} />
      </div>

      {/* QUICK SUGGESTIONS CAROUSEL ROW */}
      {isSubscribed && (
        <div className="bg-[#F4F2EB] border-t-2 border-slate-900 pt-2 px-2.5">
          <div className="flex overflow-x-auto no-scrollbar space-x-1.5 pb-2">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSendMessage(sug)}
                disabled={isTyping}
                className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white border-2 border-slate-900 text-slate-800 font-black text-[10px] hover:bg-slate-50 transition duration-150 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] disabled:opacity-40"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CHAT INPUT BAR */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-[#EAE7DF] border-t-2 border-slate-900 flex items-center space-x-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask AI about contract clauses..."
          className="flex-1 bg-white border-2 border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-slate-950 font-bold"
          disabled={isTyping || !isSubscribed}
        />
        <button
          type="submit"
          disabled={!chatInput.trim() || isTyping || !isSubscribed}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            chatInput.trim() && !isTyping && isSubscribed
              ? 'bg-[#00E676] text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]'
              : 'bg-[#DEDACF] text-slate-400 border-2 border-slate-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4 fill-current transform rotate-90" viewBox="0 0 24 24">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </button>
      </form>

      {/* Glassmorphism Lock Overlay */}
      {!isSubscribed && (
        <div className="absolute top-0 bottom-14 left-0 right-0 bg-[#F4F2EB]/95 backdrop-blur-[2px] z-40 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 text-xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] mb-4 animate-bounce" style={{ animationDuration: '4s' }}>
            🔒
          </div>
          <h3 className="text-sm font-black text-slate-900 leading-snug">Ask AI Chat Locked</h3>
          <p className="text-[10px] text-slate-600 mt-2 max-w-[200px] leading-relaxed font-bold">
            Upgrade to Pro Protector to query this contract and obtain counter-proposals.
          </p>
          <button
            onClick={handleScrollToPaywall}
            className="mt-5 px-6 py-2.5 bg-[#00E676] text-slate-900 border-2 border-slate-900 font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-150 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]"
          >
            Upgrade to Pro
          </button>
        </div>
      )}

      <BottomNav 
        activeScreenIndex={activeScreenIndex}
        setActiveScreenIndex={setActiveScreenIndex}
        hasUploaded={hasUploaded}
        isSubscribed={isSubscribed}
      />
    </div>
  );
}
