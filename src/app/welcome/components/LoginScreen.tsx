"use client";

import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all credentials.");
      return;
    }

    if (authMode === 'signup') {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (!agreeTerms) {
        setError("You must agree to the Terms of Service.");
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const displayName = name.trim() || email.split('@')[0];
      onLoginSuccess(displayName);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] p-5 justify-between select-none">
      
      {/* Top Banner / Logo */}
      <div className="text-center mt-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-xl shadow-[0_8px_20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.6)]">
          🛡️
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mt-2.5">
          LegalDecoder
        </h3>
        <p className="text-[9px] text-slate-500 font-bold tracking-tight">
          AI-Powered Document Risk Auditor
        </p>
      </div>

      {/* Auth Form Card */}
      <div className="my-auto bg-white border border-slate-150/80 rounded-2xl p-4 shadow-[0_12px_30px_rgba(0,0,0,0.04)] space-y-4">
        
        {/* Toggle Tab Row (Styleguide style) */}
        <div className="flex border-b border-slate-100 pb-1">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setError(null);
            }}
            className={`flex-1 pb-2 text-[10.5px] font-black uppercase tracking-wider transition-all relative ${
              authMode === 'signin' ? 'text-[#DF5B30]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Sign In
            {authMode === 'signin' && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#DF5B30] rounded-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setError(null);
            }}
            className={`flex-1 pb-2 text-[10.5px] font-black uppercase tracking-wider transition-all relative ${
              authMode === 'signup' ? 'text-[#DF5B30]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Sign Up
            {authMode === 'signup' && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#DF5B30] rounded-full" />
            )}
          </button>
        </div>

        {/* Error Alert Box (Styleguide alert style) */}
        {error && (
          <div className="p-2.5 bg-[#FFF2EE] border border-[#FFD9CE] text-[9.5px] font-bold text-[#DF5B30] rounded-xl flex items-center space-x-1.5 shadow-[0_2px_8px_rgba(223,91,48,0.05)] text-left">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Actual Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {authMode === 'signup' && (
            <div className="space-y-1 text-left">
              <label className="text-[8.5px] font-black text-slate-500 uppercase tracking-wider block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#DF5B30] focus:ring-1 focus:ring-[#DF5B30] shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] transition"
              />
            </div>
          )}

          <div className="space-y-1 text-left">
            <label className="text-[8.5px] font-black text-slate-500 uppercase tracking-wider block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@designstudio.io"
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#DF5B30] focus:ring-1 focus:ring-[#DF5B30] shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] transition"
            />
          </div>

          <div className="space-y-1 text-left">
            <label className="text-[8.5px] font-black text-slate-500 uppercase tracking-wider block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#DF5B30] focus:ring-1 focus:ring-[#DF5B30] shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] transition"
            />
          </div>

          {/* Terms checkbox for sign up */}
          {authMode === 'signup' && (
            <div className="flex items-start space-x-2 text-left pt-1.5">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-350 text-[#DF5B30] focus:ring-[#DF5B30]"
              />
              <label htmlFor="terms" className="text-[9px] text-slate-500 font-bold leading-tight">
                I agree to the <span className="text-[#DF5B30] underline cursor-pointer">Terms of Service</span> and <span className="text-[#DF5B30] underline cursor-pointer">Privacy Policy</span>.
              </label>
            </div>
          )}

          {/* Submit Button (Styleguide Orange Button style) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-2.5 bg-[#DF5B30] text-white text-[10px] font-black uppercase tracking-wider rounded-xl border border-transparent shadow-[0_4px_12px_rgba(223,91,48,0.2)] hover:shadow-[0_4px_16px_rgba(223,91,48,0.45)] hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center space-x-1"
          >
            <span>{isSubmitting ? "Authenticating..." : authMode === 'signin' ? "Sign In Securely" : "Create My Account"}</span>
          </button>
        </form>
      </div>

      {/* Alternative third-party auth */}
      <div className="space-y-2">
        <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block">
          OR CONTINUE WITH
        </span>
        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={() => onLoginSuccess("Sarah_Apple")}
            className="py-2 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center justify-center space-x-1 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-slate-50 active:scale-[0.98] transition"
          >
            <span></span>
            <span>Apple</span>
          </button>
          <button
            type="button"
            onClick={() => onLoginSuccess("Sarah_Google")}
            className="py-2 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center justify-center space-x-1 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-slate-50 active:scale-[0.98] transition"
          >
            <span>G</span>
            <span>Google</span>
          </button>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="text-center mb-1">
        <span className="text-[8px] font-bold text-slate-450 leading-tight block">
          Locked under TLS 1.3 Bank-Grade Security Sandbox.
        </span>
      </div>

    </div>
  );
}
