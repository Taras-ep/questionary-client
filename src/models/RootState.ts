import { QuizzesState } from "./QuizState.ts";
import { QuestionsState } from "./QuizQuestionState.ts";
import { AuthState } from "../Utils/Redux/AuthUserReducer.ts";
import { QuizAttemptState } from "./QuizAttemptState.ts";

export interface RootState {
  quizzes: QuizzesState;
  questions: QuestionsState;
  quizAttempt: QuizAttemptState;
  authState: AuthState;
}