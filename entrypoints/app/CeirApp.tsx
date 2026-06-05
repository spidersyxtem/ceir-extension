import React, { useState } from 'react';
// WXT Alias Path ကို သုံးပြီး ဖိုဒါအဆင့်ဆင့်ပြဿနာနှင့် စာလုံးအကြီးအသေး Error ကို အပြတ်ရှင်းခြင်း
import { useCeirChecker } from '../../useCeirChecker';

export default function CeirApp() {
  const [imeiInput, setImeiInput] = useState('');
  const { checkImeis, isLoading, results, error } = useCeirChecker();

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imeiInput.trim()) return;
    
    // တစ်ကြောင်းချင်းစီ ခွဲထုတ်ပြီး Array ပြောင်းခြင်း
    const imeis = imeiInput
      .split('\n')
      .map(imei => imei.trim())
      .filter(imei => imei.length > 0);
      
    checkImeis(imeis);
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-slate-950/95 flex flex-col items-center justify-center p-4 font-sans text-slate-100 overflow-y-auto">
      
      {/* Glassmorphism Container Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Header - Branding ပြောင်းလဲထားခြင်း (GitHub လင့်ခ်များ လုံးဝ ဖြုတ်ထားပါသည်) */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Auto Generate VPN Active
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            CEIR Pro Checker
          </h1>
          <p className="text-xs text-slate-400">
            IMEI နံပါတ်များကို တစ်ကြောင်းလျှင် တစ်ခုစီ ထည့်သွင်းစစ်ဆေးနိုင်ပါသည်။
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>IMEI Numbers (*#06#)</span>
              <span className="text-slate-500">Bulk Input Mode</span>
            </label>
            <textarea
              className="w-full h-36 bg-slate-900/60 border border-white/5 rounded-2xl p-4 text-sm text-emerald-400 font-mono placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition resize-none"
              placeholder="862458070647562&#10;862458070647563"
              value={imeiInput}
              onChange={(e) => setImeiInput(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !imeiInput.trim()}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-[0.98] text-white font-semibold rounded-2xl shadow-lg shadow-emerald-950/20 transition disabled:opacity-40 disabled:pointer-events-none text-sm cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                စစ်ဆေးနေပါသည်...
              </div>
            ) : 'စစ်ဆေးမည်'}
          </button>
        </form>

        {/* Error Handling Display */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-xs text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Results Sections */}
        {results && results.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-white/5 max-h-60 overflow-y-auto pr-1">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">စစ်ဆေးပြီးရလဒ်များ</h3>
            <div className="space-y-2">
              {results.map((res, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
                    res.status === 'success' 
                      ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-300' 
                      : 'bg-rose-500/5 border-rose-500/10 text-rose-300'
                  }`}
                >
                  <div className="pt-0.5">
                    {res.status === 'success' ? (
                      <span className="flex w-2 h-2 rounded-full bg-emerald-400" />
                    ) : (
                      <span className="flex w-2 h-2 rounded-full bg-rose-400" />
                    )}
                  </div>
                  <div className="space-y-1 text-xs flex-1">
                    <p className="font-mono text-slate-400">IMEI: {res.imei}</p>
                    <p className="font-medium text-sm leading-relaxed">{res.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
