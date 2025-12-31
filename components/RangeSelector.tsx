
import React, { useState } from 'react';
import { RangeOption } from '../types';

interface RangeSelectorProps {
    title: string;
    icon: React.ReactNode;
    options: RangeOption[];
    onPresetSelect: (min: string, max: string) => void;
    minNote: string;
    maxNote: string;
    setMinNote: (value: string) => void;
    setMaxNote: (value: string) => void;
}

type SelectionMode = 'preset' | 'custom';

const RangeSelector: React.FC<RangeSelectorProps> = ({
    title,
    icon,
    options,
    onPresetSelect,
    minNote,
    maxNote,
    setMinNote,
    setMaxNote,
}) => {
    const [mode, setMode] = useState<SelectionMode>('preset');

    const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = options.find(opt => opt.name === e.target.value);
        if (selectedOption) {
            onPresetSelect(selectedOption.min, selectedOption.max);
        } else {
            onPresetSelect('', '');
        }
    };

    return (
        <div className="bg-brand-light p-6 rounded-xl shadow-lg border border-gray-700 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-brand-text mb-4 flex items-center">
                {icon}
                <span className="ml-3">{title}</span>
            </h2>

            <div className="flex bg-gray-900 rounded-full p-1 mb-4">
                <button
                    onClick={() => setMode('preset')}
                    className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${mode === 'preset' ? 'bg-brand-primary text-brand-secondary' : 'text-brand-subtext hover:bg-gray-700'}`}
                >
                    Presets
                </button>
                <button
                    onClick={() => setMode('custom')}
                    className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${mode === 'custom' ? 'bg-brand-primary text-brand-secondary' : 'text-brand-subtext hover:bg-gray-700'}`}
                >
                    Custom
                </button>
            </div>
            
            <div className="flex-grow">
                {mode === 'preset' ? (
                    <div className="space-y-4 animate-fade-in">
                         <label htmlFor={`${title}-preset`} className="block text-sm font-medium text-brand-subtext">Select a preset</label>
                        <select
                            id={`${title}-preset`}
                            onChange={handlePresetChange}
                            value={options.find(opt => opt.min === minNote && opt.max === maxNote)?.name || ''}
                            className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                        >
                            <option value="">-- Pilih --</option>
                            {options.map((opt) => (
                                <option key={opt.name} value={opt.name}>
                                    {opt.name} ({opt.min} - {opt.max})
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`${title}-min`} className="block text-sm font-medium text-brand-subtext">Note Terendah</label>
                                <input
                                    type="text"
                                    id={`${title}-min`}
                                    value={minNote}
                                    onChange={(e) => setMinNote(e.target.value.toUpperCase())}
                                    placeholder="e.g., C3"
                                    className="mt-1 w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label htmlFor={`${title}-max`} className="block text-sm font-medium text-brand-subtext">Note Tertinggi</label>
                                <input
                                    type="text"
                                    id={`${title}-max`}
                                    value={maxNote}
                                    onChange={(e) => setMaxNote(e.target.value.toUpperCase())}
                                    placeholder="e.g., E5"
                                    className="mt-1 w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RangeSelector;
