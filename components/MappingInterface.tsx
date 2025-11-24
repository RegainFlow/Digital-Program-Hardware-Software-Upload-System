import React, { useEffect, useState } from 'react';
import { Icons } from './Icon';
import { NeonButton } from './NeonButton';
import { ColumnMapping, StandardField, UploadedFileState, AppStep } from '../types';
import { TARGET_SCHEMA } from '../constants';
import { getGeminiMappings } from '../services/geminiService';

interface MappingInterfaceProps {
  fileData: UploadedFileState;
  onBack: () => void;
  onComplete: () => void;
}

export const MappingInterface: React.FC<MappingInterfaceProps> = ({ fileData, onBack, onComplete }) => {
  const [mappings, setMappings] = useState<ColumnMapping[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(true);

  // Initialize mappings
  useEffect(() => {
    const init = async () => {
      setIsLoadingAI(true);

      // Default empty mappings
      const initialMappings: ColumnMapping[] = fileData.rawHeaders.map(header => ({
        sourceHeader: header,
        targetFieldKey: null,
        confidence: 0,
        isConfirmed: false
      }));

      // Check if this is the sample dataset
      if (fileData.fileName === "legacy_hr_export_2024.csv") {
        // Hardcoded mappings for demo
        const demoMappings = initialMappings.map(m => {
          let target = null;
          if (m.sourceHeader === "Emp Ref") target = "employee_id";
          if (m.sourceHeader === "Given Name") target = "first_name";
          if (m.sourceHeader === "Surname") target = "last_name";
          if (m.sourceHeader === "Work Email") target = "email_address";
          if (m.sourceHeader === "Dept") target = "department";
          if (m.sourceHeader === "Joined") target = "start_date";
          if (m.sourceHeader === "Comp") target = "salary";
          if (m.sourceHeader === "Status") target = "is_active";

          return {
            ...m,
            targetFieldKey: target,
            confidence: target ? 1.0 : 0,
            isConfirmed: !!target
          };
        });
        setMappings(demoMappings);
        setIsLoadingAI(false);
        return;
      }

      // Call Gemini API for other files
      const aiSuggestions = await getGeminiMappings(fileData.rawHeaders, TARGET_SCHEMA);

      if (aiSuggestions) {
        // Merge AI suggestions
        const updatedMappings = initialMappings.map(m => {
          const suggestion = aiSuggestions.mappings.find(s => s.source === m.sourceHeader);

          // Find matching key in target schema to validate
          const targetKey = TARGET_SCHEMA.find(t => t.key === suggestion?.target)?.key || null;

          return {
            ...m,
            targetFieldKey: targetKey,
            confidence: targetKey ? 0.9 : 0, // Mock confidence based on hit
            isConfirmed: false
          };
        });
        setMappings(updatedMappings);
      } else {
        setMappings(initialMappings);
      }

      setIsLoadingAI(false);
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMapChange = (sourceHeader: string, newTarget: string) => {
    setMappings(prev => prev.map(m =>
      m.sourceHeader === sourceHeader
        ? { ...m, targetFieldKey: newTarget === "null" ? null : newTarget, isConfirmed: true }
        : m
    ));
  };

  const autoMapCount = mappings.filter(m => m.targetFieldKey !== null).length;

  return (
    <div className="w-full max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-primary-alpha15 rounded-lg border border-primary/30">
              <Icons.Robot size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-logo text-white">Mock AI Normalization</h2>
          </div>
          <p className="text-gray-400 text-sm ml-14">
            {fileData.fileName === "legacy_hr_export_2024.csv"
              ? <span className="text-primary">Demo Mode: Auto-mapped sample data</span>
              : `Mock AI detected ${autoMapCount} probable matches for `
            }
            {fileData.fileName !== "legacy_hr_export_2024.csv" && <span className="text-white font-mono">{fileData.fileName}</span>}
          </p>
        </div>
        <div className="flex gap-3">
          <NeonButton variant="secondary" onClick={onBack}>Cancel</NeonButton>
          <NeonButton
            variant="primary"
            onClick={onComplete}
            disabled={isLoadingAI}
            icon={<Icons.ArrowRight weight="bold" />}
          >
            Process Data
          </NeonButton>
        </div>
      </div>

      {/* Main Content: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Source File Preview (Small) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Icons.File className="text-gray-400" />
              Source Preview
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    {fileData.rawHeaders.slice(0, 2).map(h => (
                      <th key={h} className="py-2 px-2 text-gray-400 font-mono">{h}</th>
                    ))}
                    <th className="py-2 px-2 text-gray-500 italic">...</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData.rawRows.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      {row.slice(0, 2).map((cell, j) => (
                        <td key={j} className="py-2 px-2 text-gray-300 truncate max-w-[100px]">{cell}</td>
                      ))}
                      <td className="py-2 px-2 text-gray-600">...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-xs text-gray-500 font-mono">
              {fileData.rawRows.length} rows • {fileData.fileSize}
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-primary-alpha15 to-transparent border-primary/20">
            <h4 className="text-primary font-semibold mb-2 flex items-center gap-2">
              <Icons.Lightning weight="fill" />
              AI Insight
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              I've analyzed the column headers. "Comp" strongly correlates with "Annual Salary", and "Joined" maps to "Start Date". Please review the mappings on the right.
            </p>
          </div>
        </div>

        {/* Right: Mapping Interface */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <span className="font-mono text-sm text-gray-400 uppercase tracking-wider">Source Column</span>
              <Icons.ArrowRight className="text-gray-600" />
              <span className="font-mono text-sm text-primary uppercase tracking-wider">Target Field (SQL)</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {isLoadingAI ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 w-full bg-white/5 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : (
                mappings.map((mapping, idx) => (
                  <div key={idx} className="flex items-center justify-between group p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">

                    {/* Source */}
                    <div className="w-1/3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-gray-400 font-mono text-xs border border-white/10">
                        {idx + 1}
                      </div>
                      <span className="text-white font-medium truncate" title={mapping.sourceHeader}>
                        {mapping.sourceHeader}
                      </span>
                    </div>

                    {/* Connector */}
                    <div className="flex-1 flex justify-center">
                      {mapping.confidence > 0.8 && (
                        <div className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/30">
                          AI MATCH
                        </div>
                      )}
                    </div>

                    {/* Target Select */}
                    <div className="w-1/2">
                      <select
                        className={`
                          w-full bg-[#1a1a1a] border rounded-lg px-3 py-2 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary transition-colors
                          ${mapping.targetFieldKey
                            ? 'text-primary border-primary/50'
                            : 'text-gray-500 border-white/10'
                          }
                        `}
                        value={mapping.targetFieldKey || "null"}
                        onChange={(e) => handleMapChange(mapping.sourceHeader, e.target.value)}
                      >
                        <option value="null">-- Ignore Column --</option>
                        {TARGET_SCHEMA.map(field => (
                          <option key={field.key} value={field.key}>
                            {field.label} {field.required ? '*' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
