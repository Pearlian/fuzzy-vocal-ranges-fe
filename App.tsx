
import React, { useState, useMemo } from 'react';
import { AnalysisResult, AnalysisPayload } from './types';
import { SAMPLE_SONGS, VOCAL_RANGES } from './constants';
import Header from './components/Header';
import RangeSelector from './components/RangeSelector';
import ResultsDisplay from './components/ResultsDisplay';
import { MusicNoteIcon, MicrophoneIcon } from './components/Icons';

const App: React.FC = () => {
    const [songMin, setSongMin] = useState<string>('');
    const [songMax, setSongMax] = useState<string>('');
    const [singerMin, setSingerMin] = useState<string>('');
    const [singerMax, setSingerMax] = useState<string>('');

    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiEndpoint, setApiEndpoint] = useState<string>('http://localhost:5000/analysis');

    const isFormValid = useMemo(() => {
        return songMin && songMax && singerMin && singerMax;
    }, [songMin, songMax, singerMin, singerMax]);

    const handleAnalyze = async () => {
        if (!isFormValid) return;

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        const payload: AnalysisPayload = { songMin, songMax, singerMin, singerMax };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Handle non-successful HTTP responses (e.g., 404, 500, 400)
            if (!response.ok) {
                // Provide a specific, user-friendly message for 404 Not Found
                if (response.status === 404) {
                    throw new Error('API endpoint not found. Please check the URL.');
                }
                
                // For other errors, try to parse the error message from the server's JSON response
                let errorMessage = `An unexpected error occurred (status: ${response.status}).`;
                try {
                    const errorData = await response.json();
                    // This will catch messages from your "invariant" and 500 errors
                    if (errorData && errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch (e) {
                    // The error response wasn't valid JSON, stick with the generic error.
                }
                throw new Error(errorMessage);
            }
            
            const result = await response.json();
            
            // Handle successful responses that might still indicate a failure
            if (result.status === 'success' && result.data?.analysis) {
                 setAnalysisResult(result.data.analysis);
            } else {
                throw new Error(result.message || "Invalid response structure from API.");
            }

        } catch (err) {
            // This single catch block now handles network errors and all thrown server errors
            setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-brand-secondary text-brand-text font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <Header />
                <main className="mt-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <RangeSelector
                            title="Vocal Range Lagu"
                            icon={<MusicNoteIcon />}
                            options={SAMPLE_SONGS}
                            onPresetSelect={(min, max) => {
                                setSongMin(min);
                                setSongMax(max);
                            }}
                            minNote={songMin}
                            maxNote={songMax}
                            setMinNote={setSongMin}
                            setMaxNote={setSongMax}
                        />
                        <RangeSelector
                            title="Vocal Range Penyanyi"
                            icon={<MicrophoneIcon />}
                            options={VOCAL_RANGES}
                            onPresetSelect={(min, max) => {
                                setSingerMin(min);
                                setSingerMax(max);
                            }}
                            minNote={singerMin}
                            maxNote={singerMax}
                            setMinNote={setSingerMin}
                            setMaxNote={setSingerMax}
                        />
                    </div>

                    <div className="space-y-2 bg-brand-light p-6 rounded-xl shadow-lg border border-gray-700">
                        <label htmlFor="api-endpoint" className="block text-md font-semibold text-brand-text">
                            API Endpoint
                        </label>
                        <input
                            type="text"
                            id="api-endpoint"
                            value={apiEndpoint}
                            onChange={(e) => setApiEndpoint(e.target.value)}
                            placeholder="e.g., http://localhost:5000/analysis"
                            className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                            aria-describedby="endpoint-description"
                        />
                        <p id="endpoint-description" className="text-sm text-brand-subtext">Backend URL yang akan melakukan analisis vocal range.</p>
                    </div>


                    <div className="flex justify-center">
                        <button
                            onClick={handleAnalyze}
                            disabled={!isFormValid || isLoading}
                            className="w-full md:w-1/2 bg-brand-primary text-brand-secondary font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-green-400 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing...
                                </>
                            ) : (
                                'Cek Kecocokan'
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="text-center p-4 bg-red-900/50 text-red-300 rounded-lg animate-fade-in">
                            <strong>Error:</strong> {error}
                        </div>
                    )}
                    
                    {analysisResult && (
                        <div className="animate-slide-up">
                            <ResultsDisplay result={analysisResult} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;
