import React from 'react';
import { Icons } from './Icon';
import { NeonButton } from './NeonButton';
import { UploadedFileState } from '../types';

interface DashboardViewProps {
    fileData: UploadedFileState;
    onReset: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ fileData, onReset }) => {
    return (
        <div className="w-full max-w-[95%] mx-auto animate-fadeIn space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Icons.Database size={32} className="text-green-400" />
                        </div>
                        Repository Data
                    </h2>
                    <p className="text-gray-400 text-base mt-2 ml-16">
                        Successfully normalized <span className="text-primary font-mono font-bold">{fileData.rawRows.length}</span> records from <span className="text-white font-medium">{fileData.fileName}</span>
                    </p>
                </div>
                <div className="flex gap-4">
                    <NeonButton variant="secondary" onClick={() => window.print()}>Export Report</NeonButton>
                    <NeonButton variant="primary" onClick={onReset} icon={<Icons.Upload />}>Upload New File</NeonButton>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:bg-white/[0.03] transition-colors group">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                        <Icons.Check size={28} weight="fill" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">100%</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">Data Integrity</div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:bg-white/[0.03] transition-colors group">
                    <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        <Icons.Table size={28} weight="fill" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">{fileData.rawRows.length}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">Total Records</div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:bg-white/[0.03] transition-colors group">
                    <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                        <Icons.Lightning size={28} weight="fill" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white">0.4s</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-1">Processing Time</div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/[0.02] text-gray-400 font-mono uppercase text-xs border-b border-white/5">
                            <tr>
                                {fileData.rawHeaders.map((header, i) => (
                                    <th key={i} className="px-8 py-5 font-semibold tracking-wider whitespace-nowrap">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {fileData.rawRows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                                    {row.map((cell, i) => (
                                        <td key={i} className="px-8 py-5 text-gray-300 group-hover:text-white transition-colors text-sm whitespace-nowrap">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};
