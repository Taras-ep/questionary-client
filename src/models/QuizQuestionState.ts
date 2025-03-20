export const TEXT_QUESTIO0N_TYPE = "Text"
export const SINGLE_CHOICE_QUESTION_TYPE = "Single choice"
export const MULTIPLE_CHOICE_QUESTION_TYPE = "Multiple choice"

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

