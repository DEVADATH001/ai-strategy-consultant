import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ReportView from './components/ReportView';
import { UserInput, AnalysisReport, AppState } from './types';
import { generateStrategyReport } from './services/geminiService';
import { LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [input, setInput] = useState<UserInput>({
    leadName: '',
    companyName: '',
    websiteData: '',
    userChallenge: '',
    industry: ''
  });
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (key: keyof UserInput, value: string) => {
    setInput(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Only Company Name is strictly required now
    if (!input.companyName) return;

    setAppState(AppState.ANALYZING);
    setError(null);
    setReport(null);

    try {
      const result = await generateStrategyReport(input);
      setReport(result);
      setAppState(AppState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while analyzing.");
      setAppState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar / Input Area */}
      <aside className="w-full md:w-[400px] lg:w-[450px] p-4 md:h-screen md:sticky md:top-0 z-10 flex-shrink-0">
        <InputForm 
          input={input} 
          onChange={handleInputChange} 
          onSubmit={handleSubmit}
          appState={appState}
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {appState === AppState.IDLE && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <LayoutDashboard className="w-10 h-10 text-slate-300" />
              </div>
              <h2 className="text-xl font-semibold text-slate-600 mb-2">Ready to Strategize</h2>
              <p className="text-center max-w-md">
                Enter the company details in the sidebar to generate a comprehensive AI automation proposal.
              </p>
            </div>
          )}

          {appState === AppState.ANALYZING && (
             <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xl">🤖</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 animate-pulse">Consulting AI Model...</h3>
              <p className="text-slate-500 mt-2 text-center max-w-xs">
                Analyzing market fit, identifying gaps, and formulating ROI-driven solutions.
              </p>
            </div>
          )}

          {appState === AppState.ERROR && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-800">
              <h3 className="font-bold text-lg mb-2">Analysis Failed</h3>
              <p>{error}</p>
              <button 
                onClick={handleSubmit} 
                className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {appState === AppState.COMPLETE && report && (
            <ReportView report={report} companyName={input.companyName} />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;