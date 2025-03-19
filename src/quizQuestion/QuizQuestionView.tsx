import React from "react";
import { useDispatch } from "react-redux";
import { removeQuizQuestion, updateQuizQuestion } from "../Utils/Redux/QuizQuestionReducer.ts";
import QuizQuestion from "../models/QuizQuestion.ts";
import '../styles/QuizQuestion.scss'

interface QuizQuestionEditorProps {
    question: QuizQuestion,
    questionNumber: number
}

const QuizQuestionView = (props: QuizQuestionEditorProps) => {
    const dispatch = useDispatch()
    return (
        <div className="quiz-question-view-container">
            <div className="top-view-container">
                <div className="quiz-question-index">{props.questionNumber}</div>
                <div className="quiz-question-output">{props.question.questionText}</div>
                <button
                    aria-label="edit-question"
                    type="button"
                    className="button-edit"
                    onClick={() => { }}
                >
                    EDIT
                </button>
                <button
                    aria-label="delete-question"
                    type="button"
                    className="button-delete"
                    onClick={() => dispatch(removeQuizQuestion(props.question.id))}
                >
                    <img src="./icons/trashbin_icon.svg" alt="delete"/>
                </button>
            </div>
        </div>
    )
}

export default QuizQuestionView