import React, { useState } from 'react';
import { Sparkles, Phone, Mail, Lock, Smartphone, Check } from 'lucide-react';

interface LoginViewProps {
  onComplete: () => void;
  userEmail: string;
}

export default function LoginView({ onComplete, userEmail }: LoginViewProps) {
  const [authType, setAuthType] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState(userEmail || '');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (authType === 'phone' && !otpSent) {
        setOtpSent(true);
      } else {
        // Complete login
        onComplete();
      }
    }, 1200);
  };

  return (
    <div className="flex-1 bg-white flex flex-col justify-between p-6 h-full font-sans">
      <div className="pt-2">
        {/* Top Logo and Tagline */}
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-5 h-5 text-rose-500" />
          <span className="text-xs uppercase tracking-widest font-black text-stone-900">GlowUp Studio</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-950">Welcome to GlowUp</h2>
        <p className="text-stone-500 text-xs">Unlock tailored wellness & expert salon care</p>
      </div>

      {/* Primary Authentication card */}
      <div className="my-auto py-4">
        {/* Toggle Headings */}
        <div className="bg-stone-100 p-1 rounded-xl flex gap-1 mb-6">
          <button
            id="login-toggle-phone"
            type="button"
            onClick={() => { setAuthType('phone'); setOtpSent(false); }}
            className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
              authType === 'phone'
                ? 'bg-white text-stone-950 shadow-sm'
                : 'text-stone-500 hover:text-stone-850'
            }`}
          >
            Phone Number
          </button>
          <button
            id="login-toggle-email"
            type="button"
            onClick={() => { setAuthType('email'); setOtpSent(false); }}
            className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
              authType === 'email'
                ? 'bg-white text-stone-950 shadow-sm'
                : 'text-stone-500 hover:text-stone-850'
            }`}
          >
            Email Address
          </button>
        </div>

        {/* Dynamic Forms */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {!otpSent ? (
            <>
              {authType === 'phone' ? (
                <div>
                  <label htmlFor="login-phone-input" className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                    Your Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-xs">
                      +1
                    </span>
                    <input
                      id="login-phone-input"
                      type="tel"
                      required
                      placeholder="(555) 019-2834"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:ring-1 focus:ring-rose-400 focus:border-rose-400 transition-all outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1.5 leading-normal">
                    We will send a non-billing static 4-digit code to authorize this session safely.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label htmlFor="login-email-input" className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                      <input
                        id="login-email-input"
                        type="email"
                        required
                        placeholder="yourname@glowup.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:ring-1 focus:ring-rose-400 focus:border-rose-400 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password-input" className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                      <input
                        id="login-password-input"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:ring-1 focus:ring-rose-400 focus:border-rose-400 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                id="submit-auth-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-stone-950 hover:bg-stone-900 text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md transition-all active:scale-[0.99] flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="w-4 h-4 rounded-full border border-white border-t-transparent animate-spin" />
                ) : authType === 'phone' ? (
                  'Send Verification Code'
                ) : (
                  'Sign In securely'
                )}
              </button>
            </>
          ) : (
            // OTP verification panel
            <div className="space-y-4">
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-center">
                <p className="text-[11px] text-stone-600">
                  Code sent to <strong className="text-stone-900">+1 {phoneNumber || '(555) 019-2834'}</strong>
                </p>
              </div>

              <div>
                <label htmlFor="login-otp-input" className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 text-center">
                  Enter 4-Digit Verification Code
                </label>
                <div className="flex gap-2 justify-center">
                  <input
                    id="login-otp-input"
                    type="text"
                    required
                    maxLength={4}
                    placeholder="1234"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-24 text-center tracking-[0.5em] font-mono font-black text-lg py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:ring-1 focus:ring-rose-400 focus:border-rose-400 transition-all outline-none"
                  />
                </div>
              </div>

              <button
                id="verify-otp-btn"
                type="submit"
                disabled={isLoading}
                className="w-full bg-stone-950 hover:bg-stone-900 text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md transition-all active:scale-[0.99] flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="w-4 h-4 rounded-full border border-white border-t-transparent animate-spin" />
                ) : (
                  'Verify & Continue'
                )}
              </button>

              <button
                id="resend-otp-btn"
                type="button"
                onClick={() => { setOtpCode(''); setOtpSent(false); }}
                className="block mx-auto text-[11px] font-bold text-rose-500 hover:text-rose-600 transition-colors"
              >
                Change Phone Number
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Alternative Secure Logins */}
      {!otpSent && (
        <div className="pt-4 border-t border-stone-100 space-y-3.5">
          <div className="relative text-center">
            <span className="absolute inset-0 top-1/2 -translate-y-1/2 border-b border-stone-100"></span>
            <span className="relative bg-white px-3 text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              id="social-login-google"
              type="button"
              onClick={onComplete}
              className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-stone-700 active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" strokeWidth="0" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google
            </button>

            <button
              id="social-login-apple"
              type="button"
              onClick={onComplete}
              className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-stone-700 active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.93 16.14 3.73 9.4 7.42 9.1c1.55-.12 2.6.76 3.42.76.83 0 2.18-.93 4.13-.74 1.7.16 2.65.88 3.19 1.73-3.1 1.74-2.6 5.86.5 7.15-.65 1.5-1.6 3.1-1.6 3.1zM12.03 8.25c-.24-2.2 1.43-4.14 3.45-4.25.2 2.38-1.58 4.31-3.45 4.25z" />
              </svg>
              Apple
            </button>
          </div>

          <p className="text-[10px] text-center text-stone-400">
            By signing in, you agree to our <span className="underline">Terms of Service</span> & <span className="underline">Privacy Policy</span>.
          </p>
        </div>
      )}
    </div>
  );
}
