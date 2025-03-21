export const TEXT_QUESTIO0N_TYPE = "Text"
export const SINGLE_CHOICE_QUESTION_TYPE = "Single choice"
export const MULTIPLE_CHOICE_QUESTION_TYPE = "Multiple choice"

export interface QuizQuestion {
    id: string;
    questionText: string | null;
    questionType: string | null;
    isEdit: boolean;
    options?: string[] | null;
    originalId?: string; // uuid that should be replaced in redux store with the new "id" that came from backend
}

export interface QuestionsState {
    byId: Record<string, QuizQuestion>;
    allIds: string[];
}

