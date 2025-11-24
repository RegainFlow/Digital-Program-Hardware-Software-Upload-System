import React, { useCallback, useState } from 'react';
import { Icons } from './Icon';
import { MOCK_CSV_DATA } from '../constants';
import { UploadedFileState } from '../types';

interface UploadZoneProps {
  onFileProcessed: (data: UploadedFileState) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFileContent = (content: string, fileName: string, size: number) => {
    // Simple CSV parser for demo
    const lines = content.trim().split('\n');
    if (lines.length < 1) return;

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => line.split(',').map(c => c.trim()));

    onFileProcessed({
      fileName,
      fileSize: (size / 1024).toFixed(1) + ' KB',
      rawHeaders: headers,
      rawRows: rows
    });
  };

  const handleFile = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      setTimeout(() => { // Simulate processing delay
        processFileContent(content, file.name, file.size);
        setIsProcessing(false);
      }, 800);
    };

    reader.readAsText(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Demo helper to load mock data quickly
  const loadMockData = () => {
    setIsProcessing(true);
    setTimeout(() => {
      processFileContent(MOCK_CSV_DATA, "legacy_hr_export_2024.csv", 4096);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div
      className={`
        w-full max-w-2xl mx-auto h-80 rounded-2xl border-2 border-dashed transition-all duration-300
        flex flex-col items-center justify-center relative overflow-hidden group
        ${isDragging
          ? 'border-primary bg-primary-alpha15 scale-[1.02]'
          : 'border-white/10 bg-white/[0.02] hover:border-primary/50'
        }
      `}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {isProcessing ? (
        <div className="flex flex-col items-center animate-pulse">
          <Icons.Spinner size={48} className="text-primary animate-spin mb-4" />
          <p className="text-gray-400 font-mono">Analyzing file structure...</p>
        </div>
      ) : (
        <>
          <div className={`
            w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6
            border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300
            ${isDragging ? 'shadow-glow-medium bg-primary-alpha25' : ''}
          `}>
            <Icons.Upload size={32} className={`${isDragging ? 'text-white' : 'text-primary'}`} />
          </div>

          <h3 className="text-xl font-medium text-white mb-2">
            Drag & Drop your Excel/CSV file
          </h3>
          <p className="text-gray-400 text-sm mb-8">
            or <span className="text-primary cursor-pointer hover:underline">browse files</span>
          </p>

          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            accept=".csv,.txt"
          />

          <button
            onClick={(e) => { e.stopPropagation(); loadMockData(); }}
            className="z-10 mt-6 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 font-medium text-sm flex items-center gap-2 group-hover:shadow-glow-subtle"
          >
            <Icons.Lightning className="text-primary" weight="fill" />
            [DEMO] Load Sample Dataset
          </button>
        </>
      )}
    </div>
  );
};
