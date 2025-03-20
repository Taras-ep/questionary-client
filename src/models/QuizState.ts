export interface Quiz {
    id: string;
    name: string | null;
    description: string | null;
    isEdit: boolean;
    questions: string[];
}

export interface QuizzesState {
    byId: Record<string, Quiz>;
    allIds: string[];
}
