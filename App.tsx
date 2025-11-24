import React, { useState } from 'react';
import { AppStep, UploadedFileState } from './types';
import { UploadZone } from './components/UploadZone';
import { MappingInterface } from './components/MappingInterface';
import { DashboardView } from './components/DashboardView';
import { Icons } from './components/Icon';

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
    setStep(AppStep.DASHBOARD);
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
              Digital Physical Hardware <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light filter drop-shadow-[0_0_10px_rgba(0,214,203,0.3)]">
                Software List Normalizer
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Upload bulk Excel or CSV files. <span className="text-primary">Mock AI Powered Auto-Mapping</span> ensures your data is normalized and ready for ingestion in seconds.
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

        {step === AppStep.DASHBOARD && fileData && (
          <DashboardView
            fileData={fileData}
            onReset={handleReset}
          />
        )}

      </main>
    </div>
  );
}

export default App;
