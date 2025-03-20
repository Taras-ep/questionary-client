export interface QuizQuestion {
    id: string;
    questionText: string | null;
    questionType: string | null;
    isEdit: boolean;
    options?: string[] | null
}

export interface QuestionsState {
    byId: Record<string, QuizQuestion>;
    allIds: string[];
}

