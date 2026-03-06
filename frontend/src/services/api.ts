import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

export interface EvaluationPayload {
    income: number;
    expense: number;
    digitalPercent: number;
    incomeStability: number;
}

export interface EvaluationResponse {
    score: number;
    risk: string;
    suggestedLoan: number;
    confidence?: number;
}

export const evaluateCredit = async (data: EvaluationPayload): Promise<EvaluationResponse> => {
    const response = await axios.post<EvaluationResponse>(`${API_BASE_URL}/score`, data);
    return response.data;
};
