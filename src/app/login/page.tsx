"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"pass" | "code">("pass");
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic Validation
    if (activeTab === "pass") {
      if (!usernameInput.trim()) {
        setErrorMsg("⚠️ Please enter your username or email");
        return;
      }
      if (!passwordInput) {
        setErrorMsg("⚠️ Please enter your password");
        return;
      }
    } else {
      if (!phoneInput.trim()) {
        setErrorMsg("⚠️ Please enter your phone number");
        return;
      }
      if (!codeInput) {
        setErrorMsg("⚠️ Please enter the verification code");
        return;
      }
    }

    // Mock login success
    const finalName = activeTab === "pass" ? usernameInput.trim() : `User_${phoneInput.slice(-4)}`;
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", finalName);
      setSuccessMsg("✓ Login successful! Redirecting...");
      
      setTimeout(() => {
        router.push("/welcome/");
        router.refresh();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EFEB] flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md border-4 border-slate-900 bg-[#FAF9F5] rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
          
          {/* Decorative badge */}
          <div className="absolute -top-3 -right-3 px-6 py-2 bg-amber-400 border-2 border-slate-900 font-mono text-[9px] font-black uppercase tracking-wider transform rotate-12 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            Secure Auth
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Join LegalDecoder
            </h2>
            <p className="text-xs font-bold text-slate-500 mt-1">
              Unlock AI contract translation & negotiation strategies in one click.
            </p>
          </div>

          {/* Error / Success Toast Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-slate-900 rounded-xl text-xs font-black text-red-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-100 border-2 border-slate-900 rounded-xl text-xs font-black text-emerald-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              {successMsg}
            </div>
          )}

          {/* Tab Selection */}
          <div className="flex border-2 border-slate-900 rounded-xl bg-slate-100 p-1 mb-5 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <button
              onClick={() => setActiveTab("pass")}
              className={`flex-1 py-2 text-xs font-black uppercase rounded-lg transition-all ${
                activeTab === "pass"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-xs font-black uppercase rounded-lg transition-all ${
                activeTab === "code"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              SMS Code
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {activeTab === "pass" ? (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">
                    Username / Email
                  </label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter any username to test"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">
                      Password
                    </label>
                    <a href="#" className="text-[9px] font-black text-indigo-650 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter any password"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">
                    Verification Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="6-digit code"
                      className="flex-1 px-4 py-3 bg-white border-2 border-slate-900 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    />
                    <button
                      type="button"
                      onClick={() => alert("Verification code sent! Enter any text to test.")}
                      className="px-4 py-3 bg-slate-200 border-2 border-slate-900 rounded-xl text-xs font-black text-slate-800 hover:bg-slate-300 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    >
                      Get Code
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0px_0px_rgba(15,23,42,1)] active:translate-y-0 active:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all"
            >
              🚀 Login Now
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block text-center mb-3">
              Or Login With
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setUsernameInput("WeChatUser");
                  setPasswordInput("123456");
                  alert("WeChat auto login filled! Click above to submit.");
                }}
                className="py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-black flex items-center justify-center hover:bg-slate-50 active:translate-y-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transition-all"
              >
                WeChat
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsernameInput("AppleUser");
                  setPasswordInput("123456");
                  alert("Apple ID auto login filled.");
                }}
                className="py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-black flex items-center justify-center hover:bg-slate-50 active:translate-y-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transition-all"
              >
                Apple
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsernameInput("GoogleUser");
                  setPasswordInput("123456");
                  alert("Google Account auto login filled.");
                }}
                className="py-2.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-black flex items-center justify-center hover:bg-slate-50 active:translate-y-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transition-all"
              >
                Google
              </button>
            </div>
          </div>

          <div className="text-center mt-5">
            <span className="text-[10px] font-bold text-slate-500">
              No registration required. Your account will be generated automatically on your first login.
            </span>
          </div>

        </div>
      </main>
    </div>
  );
}
