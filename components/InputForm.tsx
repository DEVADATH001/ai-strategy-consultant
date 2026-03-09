import React from 'react';
import { UserInput, AppState } from '../types';
import { Loader2, Sparkles } from 'lucide-react';

interface InputFormProps {
  input: UserInput;
  onChange: (key: keyof UserInput, value: string) => void;
  onSubmit: () => void;
  appState: AppState;
}

const InputForm: React.FC<InputFormProps> = ({ input, onChange, onSubmit, appState }) => {
  const isAnalyzing = appState === AppState.ANALYZING;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Strategy Consultant
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Input lead details to generate an actionable AI transformation roadmap.
        </p>
      </div>

      <div className="space-y-4 flex-grow">
        
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={input.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            disabled={isAnalyzing}
            placeholder="e.g. Acme Logistics"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1.5">
             <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Lead Name
            </label>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Optional</span>
          </div>
          <input
            type="text"
            value={input.leadName}
            onChange={(e) => onChange('leadName', e.target.value)}
            disabled={isAnalyzing}
            placeholder="e.g. Jane Doe"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1.5">
             <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Industry
            </label>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Optional</span>
          </div>
          <input
            type="text"
            value={input.industry}
            onChange={(e) => onChange('industry', e.target.value)}
            disabled={isAnalyzing}
            placeholder="e.g. Manufacturing, SaaS, Retail"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
          />
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1.5">
             <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Website URL / Context
            </label>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Optional</span>
          </div>
          <textarea
            value={input.websiteData}
            onChange={(e) => onChange('websiteData', e.target.value)}
            disabled={isAnalyzing}
            placeholder="Paste URL or a brief description of their business..."
            rows={3}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm resize-none"
          />
        </div>

        <div>
           <div className="flex justify-between items-baseline mb-1.5">
             <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Stated Challenge
            </label>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Optional</span>
          </div>
          <textarea
            value={input.userChallenge}
            onChange={(e) => onChange('userChallenge', e.target.value)}
            disabled={isAnalyzing}
            placeholder="e.g. Leads are falling through the cracks..."
            rows={3}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm resize-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onSubmit}
          disabled={isAnalyzing || !input.companyName}
          className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-all shadow-md
            ${isAnalyzing || !input.companyName
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95'
            }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Generate Strategy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;