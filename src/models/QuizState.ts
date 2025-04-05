import { QuizQuestion } from "./QuizQuestionState";

export interface Quiz {
    id: string;
    name: string | null;
    description: string | null;
    isHidden: boolean; // if quiz is edited, the previous version is not deleted, but hidden
    oldQuizVersionId?: string,
    questionIds: string[];
}


export interface QuizWithQuestions extends Quiz {
    questions: QuizQuestion[]
}

export interface QuizzesState {
    byId: Record<string, Quiz>;
    allIds: string[];
    loading: boolean;
    error: string | null;
    totalQuizCount: null | number
}
