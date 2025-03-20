export interface Quiz {
    id: string;
    name: string | null;
    description: string | null;
    isHidden: boolean; // if quiz is edited, the previous version is not deleted, but hidden
    questions: string[];
}

export interface QuizzesState {
    byId: Record<string, Quiz>;
    allIds: string[];
}
