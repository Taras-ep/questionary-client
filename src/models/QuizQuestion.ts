export default interface QuizQuestion {
    id: string ;
    questionText: string | null;
    questionType: string | null;
    isEdit: boolean;
    options?: string[] | null
}