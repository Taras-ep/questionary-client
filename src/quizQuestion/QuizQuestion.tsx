import React from "react";
import { QuizQuestion } from "../models/QuizQuestion.ts";
import QuizQuestionView from "./QuizQuestionView.tsx";
import QuizQuestionEditor from "../forms/QuizQuestionEditor.tsx";
import '../styles/QuizQuestion.scss'

interface QuizQuestionEditorProps {
    quizId: string,
    question: QuizQuestion,
    questionNumber: number
}

const QuizQuestionEdit: React.FC<QuizQuestionEditorProps> = ({ quizId, question, questionNumber }) => {
    return (
        <div className="quiz-question-edit-container">
            {question.isEdit
                ? <QuizQuestionEditor quizId={quizId} question={question} questionNumber={questionNumber} />
                : <QuizQuestionView quizId={quizId} question={question} questionNumber={questionNumber} />}
        </div>
    );
};

export default QuizQuestionEdit;