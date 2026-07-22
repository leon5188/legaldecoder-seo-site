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

  // Third party OAuth popup modals
  const [showAppleModal, setShowAppleModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [hideEmail, setHideEmail] = useState(false);
  const [oAuthLoading, setOAuthLoading] = useState(false);

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

  const handleAppleAuthConfirm = () => {
    setOAuthLoading(true);
    setTimeout(() => {
      setOAuthLoading(false);
      setShowAppleModal(false);
      const userDisplayName = hideEmail ? "Apple User" : "Apple Account User";
      onLoginSuccess(userDisplayName);
    }, 1200);
  };

  const handleGoogleAuthSelect = (selectedEmail: string) => {
    setOAuthLoading(true);
    setTimeout(() => {
      setOAuthLoading(false);
      setShowGoogleModal(false);
      onLoginSuccess(selectedEmail.split('@')[0]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] p-5 justify-between select-none overflow-y-auto no-scrollbar">
      
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
                placeholder="Enter your full name"
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
              placeholder="user@example.com"
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
            disabled={isSubmitting}
            onClick={() => setShowAppleModal(true)}
            className="py-2 bg-[#1C1C1E] text-white border border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center justify-center space-x-1 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-black active:scale-[0.98] transition disabled:opacity-50"
          >
            <span></span>
            <span>Sign in with Apple</span>
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setShowGoogleModal(true)}
            className="py-2 bg-white border border-slate-200 text-slate-800 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center justify-center space-x-1 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-slate-50 active:scale-[0.98] transition disabled:opacity-50"
          >
            <span className="text-blue-500">G</span>
            <span>Google Sign-In</span>
          </button>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="text-center mb-1">
        <span className="text-[8px] font-bold text-slate-450 leading-tight block">
          Locked under TLS 1.3 Bank-Grade Security Protocols.
        </span>
      </div>

      {/* Apple Sign In Official Modal Sheet (AuthenticationServices) */}
      {showAppleModal && (
        <div className="absolute inset-0 bg-slate-950/70 z-50 flex flex-col justify-end">
          <div className="bg-[#1C1C1E] text-white border-t border-slate-800 rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200 text-left max-w-md mx-auto w-full">
            <div className="w-9 h-1 bg-slate-700 rounded-full mx-auto" />
            
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg"></span>
                <span className="text-xs font-black tracking-wider text-slate-200 uppercase">Sign in with Apple</span>
              </div>
              <button 
                type="button" 
                onClick={() => setShowAppleModal(false)}
                className="text-xs text-blue-500 font-bold hover:text-blue-400"
              >
                Cancel
              </button>
            </div>

            <div className="flex items-center space-x-3 py-1">
              <div className="w-10 h-10 rounded-xl bg-[#DF5B30] flex items-center justify-center text-xl text-white shadow-md">
                🛡️
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase">LegalDecoder</h4>
                <p className="text-[9px] text-slate-400 font-mono font-bold">Apple ID Authorization</p>
              </div>
            </div>

            <div className="space-y-2 border-y border-slate-800 py-3 text-xs font-bold">
              <div className="flex justify-between text-slate-400 items-center">
                <span>ACCOUNT</span>
                <span className="text-white font-mono text-[10px]">Apple User Account</span>
              </div>
              <div className="flex justify-between text-slate-400 items-center">
                <span>EMAIL</span>
                <div className="flex items-center space-x-2 text-[10px]">
                  <button 
                    type="button"
                    onClick={() => setHideEmail(false)}
                    className={`px-2 py-0.5 rounded border ${!hideEmail ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  >
                    Share Email
                  </button>
                  <button 
                    type="button"
                    onClick={() => setHideEmail(true)}
                    className={`px-2 py-0.5 rounded border ${hideEmail ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                  >
                    Hide Email
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={oAuthLoading}
              onClick={handleAppleAuthConfirm}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-1.5 shadow-[0_4px_12px_rgba(37,99,235,0.3)] active:scale-[0.98]"
            >
              <span>{oAuthLoading ? "Verifying Face ID..." : "Authenticate with Face ID / Touch ID"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Google OAuth Account Chooser Modal Sheet */}
      {showGoogleModal && (
        <div className="absolute inset-0 bg-slate-950/70 z-50 flex flex-col justify-end">
          <div className="bg-white text-slate-900 border-t border-slate-200 rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200 text-left max-w-md mx-auto w-full">
            <div className="w-9 h-1 bg-slate-300 rounded-full mx-auto" />

            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-1.5">
                <span className="text-blue-500 font-bold text-lg">G</span>
                <span className="text-xs font-black tracking-wide text-slate-800 uppercase">Sign in with Google</span>
              </div>
              <button 
                type="button" 
                onClick={() => setShowGoogleModal(false)}
                className="text-xs text-slate-400 font-bold hover:text-slate-600"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-black text-slate-900 uppercase">Google Sign-In</h4>
              <p className="text-[9.5px] text-slate-500 font-bold">Select or type your Google Account to authorize</p>
            </div>

            <div className="space-y-2 border-y border-slate-100 py-3">
              <div className="space-y-1">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Enter Your Google Account Email</label>
                <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  id="custom-google-email"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const inputVal = (document.getElementById("custom-google-email") as HTMLInputElement)?.value;
                  handleGoogleAuthSelect(inputVal && inputVal.includes("@") ? inputVal : "Google_User@gmail.com");
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition shadow-[0_4px_12px_rgba(37,99,235,0.2)] active:scale-[0.98]"
              >
                Authorize Google Account
              </button>
            </div>

            {oAuthLoading && (
              <div className="text-center text-[10px] font-mono font-bold text-blue-600 uppercase animate-pulse">
                Exchanging OAuth Token...
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
