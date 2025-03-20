export interface QuizAttempQuestionAnswer {
    answer: undefined | string | number[]
    quiestionId: string
}

export interface QuizAttemptState {
    answers: QuizAttempQuestionAnswer[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    byId: { [key: string]: any };
}