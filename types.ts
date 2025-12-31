
export interface AnalysisPayload {
    songMin: string;
    songMax: string;
    singerMin: string;
    singerMax: string;
}

export interface AnalysisResult {
    comfortHigh: string;
    comfortLow: string;
    overallComfort: string;
    verdict: string;
}

export interface RangeOption {
    name: string;
    min: string;
    max: string;
}
