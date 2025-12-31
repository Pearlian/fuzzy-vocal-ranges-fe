
import React from 'react';

interface ScoreBarProps {
    label: string;
    value: string;
    isPrimary?: boolean;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ label, value, isPrimary = false }) => {
    const numericValue = parseFloat(value);
    const percentage = numericValue * 100;

    const getColor = (val: number) => {
        if (val >= 0.8) return 'bg-green-500';
        if (val >= 0.6) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const colorClass = getColor(numericValue);

    return (
        <div>
            <div className={`flex justify-between items-center mb-1 ${isPrimary ? 'text-lg font-bold' : 'text-md'}`}>
                <span className="text-brand-subtext">{label}</span>
                <span className={`font-semibold ${isPrimary ? 'text-brand-primary' : 'text-brand-text'}`}>{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                    className={`${colorClass} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ScoreBar;
