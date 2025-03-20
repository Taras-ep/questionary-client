import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeQuestionFromQuiz } from "../../Utils/Redux/QuizCatalogReducer.ts";
import { QuizQuestion } from "../../models/QuizQuestionState.ts";
import QuizQuestionView from "./QuizQuestionView.tsx";
import DeleteButton from "../utils/DeleteButton.tsx";
import QuizQuestionEditorForm from "./QuizQuestionEditorForm.tsx";
import { editQuestionInQuiz } from "../../Utils/Redux/QuizQuestionReducer.ts";
import './QuizQuestion.scss'

interface QuizQuestionEditorViewProps {
    quizId: string,
    question: QuizQuestion,
    questionIndex: number
}

const QuizQuestionEditorView = (props: QuizQuestionEditorViewProps) => {

    const dispatch = useDispatch()

    return (
        <div className="quiz-question-view-container">
            <div className="top-view-container">
                <div className="quiz-question-index">{props.questionIndex + 1}</div>
                {props.question.isEdit ? (
                    <QuizQuestionEditorForm questionNumber={props.questionIndex} quizId={props.quizId} question={props.question} />
                ) : (
                    <QuizQuestionView quizId={props.quizId} question={props.question} preview={true} />
                )}
                <div className="buttons-container">
                    <button
                        aria-label="edit-question"
                        type="button"
                        className="button-edit"
                        onClick={() => dispatch(editQuestionInQuiz({ questionId: props.question.id, isEdit: true }))}
                    >
                        EDIT
                    </button>
                    <DeleteButton onDelete={() => dispatch(removeQuestionFromQuiz({ questionId: props.question.id, quizId: props.quizId }))} />
                </div>
            </div>
        </div>
    )
}

export default QuizQuestionEditorView