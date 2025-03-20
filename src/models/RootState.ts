import { QuizzesState } from "./Quiz.ts";
import { QuestionsState } from "./QuizQuestion.ts";
import { AuthState } from "../Utils/Redux/AuthUserReducer.ts";

export interface RootState {
  quizzes: QuizzesState;
  questions: QuestionsState;
  authState: AuthState;
}