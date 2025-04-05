export interface QuizAttempQuestionAnswer {
    answer: undefined | string | number[]
    questionId: string
}

export interface QuizAttemptState {
    attemptId: number | null
    answers: QuizAttempQuestionAnswer[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    byId: { [key: string]: any };
    isFinished: boolean;
}