import React from "react";
import { QuizQuestion } from "../../models/QuizQuestionState.ts";
import QuizQuestionEditorView from "./QuizQuestionEditorView.tsx";
import QuizQuestionEditorForm from "./QuizQuestionEditorForm.tsx";
import './QuizQuestion.scss'

interface QuizQuestionEditorProps {
    quizId: string,
    question: QuizQuestion,
    questionNumber: number
}

const QuizQuestionEditor: React.FC<QuizQuestionEditorProps> = ({ quizId, question, questionNumber }) => {
    return (
        <div className="quiz-question-edit-container">
            {question.isEdit
                ? <QuizQuestionEditorForm quizId={quizId} question={question} questionNumber={questionNumber} />
                : <QuizQuestionEditorView quizId={quizId} question={question} questionNumber={questionNumber} />}
        </div>
    );
};

export default QuizQuestionEditor;