import React from "react";
import QuizQuestion from "../models/QuizQuestion.ts";
import QuizQuestionView from "./QuizQuestionView.tsx";
import QuizQuestionEditor from "../forms/QuizQuestionEditor.tsx";
import '../styles/QuizQuestion.scss'

interface QuizQuestionEditorProps {
    question: QuizQuestion,
    questionNumber: number
}

const QuizQuestionEdit: React.FC<QuizQuestionEditorProps> = ({ question, questionNumber }) => {
    return (
        <div className="quiz-question-edit-container">
            {question.isEdit ? <QuizQuestionEditor question={question} questionNumber={questionNumber}/> : <QuizQuestionView question={question} questionNumber={questionNumber} />}
        </div>
    );
};

export default QuizQuestionEdit;