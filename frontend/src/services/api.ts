import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

export interface EvaluationPayload {
    income: number;
    expense: number;
    digitalPercent: number;
    incomeStability: number;
    vendorName?: string;
    city?: string;
    scheme?: string;
}

export interface EvaluationResponse {
    score: number;
    risk: string;
    suggestedLoan: number;
    confidence?: number;
}

export interface EvaluationRecord {
    id: number;
    vendor: string;
    city: string;
    scheme: string;
    score: number;
    risk: string;
    date: string;
}

export const evaluateCredit = async (data: EvaluationPayload): Promise<EvaluationResponse> => {
    const response = await axios.post<EvaluationResponse>(`${API_BASE_URL}/score`, data);
    return response.data;
};

export const fetchEvaluations = async (): Promise<EvaluationRecord[]> => {
    const response = await axios.get<EvaluationRecord[]>(`${API_BASE_URL}/evaluations`);
    return response.data;
};
