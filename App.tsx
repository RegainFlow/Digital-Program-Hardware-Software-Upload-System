import React, { useState } from 'react';
import { AppStep, UploadedFileState } from './types';
import { UploadZone } from './components/UploadZone';
import { MappingInterface } from './components/MappingInterface';
import { Icons } from './components/Icon';
import { NeonButton } from './components/NeonButton';

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [fileData, setFileData] = useState<UploadedFileState | null>(null);

  const handleFileProcessed = (data: UploadedFileState) => {
    setFileData(data);
    setStep(AppStep.MAPPING);
  };

  const handleReset = () => {
    setFileData(null);
    setStep(AppStep.UPLOAD);
  };

  const handleProcessComplete = () => {
    // Simulate API submission
    setStep(AppStep.SUCCESS);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative overflow-hidden font-sans selection:bg-primary selection:text-black">
      
      {/* Background Ambience */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Navbar */}
      <nav className="glass-panel sticky top-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center shadow-glow-subtle">
            <Icons.Database weight="fill" className="text-black" />
          </div>
          <span className="text-xl font-bold font-logo tracking-tight">Regain<span className="text-primary">Flow</span></span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">Documentation</span>
          <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">Support</span>
          <div className="w-8 h-8 rounded-full bg-gray-700 border border-white/10 flex items-center justify-center text-xs font-mono text-white">
            JD
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        
        {step === AppStep.UPLOAD && (
          <div className="w-full max-w-4xl text-center space-y-8 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Normalize Enterprise Data <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light filter drop-shadow-[0_0_10px_rgba(0,214,203,0.3)]">
                Powered by Gemini AI
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Upload non-standard Excel or CSV files. Our AI engine automatically maps columns to your SQL Schema, validating data integrity in seconds.
            </p>
            
            <div className="pt-8">
              <UploadZone onFileProcessed={handleFileProcessed} />
            </div>
          </div>
        )}

        {step === AppStep.MAPPING && fileData && (
          <MappingInterface 
            fileData={fileData}
            onBack={handleReset}
            onComplete={handleProcessComplete}
          />
        )}

        {step === AppStep.SUCCESS && (
          <div className="glass-card max-w-md w-full p-8 rounded-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Icons.Check weight="bold" className="text-green-500 text-4xl" />
            </div>
            
            <h2 className="text-2xl font-bold text-white">Ingestion Successful</h2>
            <p className="text-gray-400">
              <span className="text-primary font-mono">{fileData?.rawRows.length}</span> rows have been normalized and pushed to the 
              <span className="text-white font-semibold"> SQL Server (Production)</span> repository.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <NeonButton variant="primary" onClick={handleReset}>Upload Another File</NeonButton>
              <NeonButton variant="secondary" onClick={() => window.open('https://google.com', '_blank')}>View in Dashboard</NeonButton>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
