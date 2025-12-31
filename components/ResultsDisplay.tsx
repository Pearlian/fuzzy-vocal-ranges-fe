
import React from 'react';
import { AnalysisResult } from '../types';
import ScoreBar from './ScoreBar';

interface ResultsDisplayProps {
    result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
    return (
        <div className="bg-brand-light p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700 space-y-6">
            <div className="border-b border-gray-700 pb-4">
                <h3 className="text-2xl font-bold text-center text-brand-primary">Analysis Results</h3>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-xl font-semibold text-brand-text">Fuzzy Scores</h4>
                <div className="space-y-3">
                    <ScoreBar label="Lower Range Comfort" value={result.comfortLow} />
                    <ScoreBar label="Upper Range Comfort" value={result.comfortHigh} />
                    <ScoreBar label="Overall Comfort" value={result.overallComfort} isPrimary={true} />
                </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
                <h4 className="text-xl font-semibold text-brand-text mb-2">Verdict</h4>
                <p className="text-brand-subtext text-lg bg-gray-900 p-4 rounded-lg italic">
                   "{result.verdict}"
                </p>
            </div>
        </div>
    );
};

export default ResultsDisplay;
