import React from "react";
import { QuizQuestion } from "../../models/QuizQuestionState.ts";
import QuizQuestionEditorView from "./QuizQuestionEditorView.tsx";
import QuizQuestionEditorForm from "./QuizQuestionEditorForm.tsx";
import './QuizQuestion.scss'

interface QuizQuestionEditorProps {
    quizId: string,
    question: QuizQuestion,
    questionIndex: number
}

const QuizQuestionEditor: React.FC<QuizQuestionEditorProps> = ({ quizId, question, questionIndex }) => {
    return (
        <div className="quiz-question-edit-container">
            {question.isEdit
                ? <QuizQuestionEditorForm quizId={quizId} question={question} questionNumber={questionIndex} />
                : <QuizQuestionEditorView quizId={quizId} question={question} questionIndex={questionIndex} />}
        </div>
    );
};

export default QuizQuestionEditor;