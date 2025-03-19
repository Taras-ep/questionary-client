import React, { useRef } from "react";
import '../styles/UserQuizQuestionForm.scss'
import { useDispatch } from "react-redux";
import { removeQuizQuestion, updateQuizQuestion } from "../Utils/Redux/QuizQuestionReducer.ts";
import QuizQuestion from "../models/QuizQuestion.ts";

interface QuizQuestionEditorProps {
    question: QuizQuestion,
    questionNumber: number
}

const QuizQuestionEditor = (props: QuizQuestionEditorProps) => {

    const dispatch = useDispatch()

    const questionTextRef = useRef<HTMLInputElement>(null)
    const questionTypeRef = useRef<HTMLInputElement>(null)

    function updateQuizQuestionOnClick() {
        if (questionTextRef.current  && questionTypeRef.current) {
            const updatedQuestion: QuizQuestion = {
                id: props.question.id,
                questionText: questionTextRef.current.value,
                questionType: questionTypeRef.current.value,
                isEdit: false
            };

            dispatch(updateQuizQuestion(updatedQuestion));
        }
    }
    return (
        <form className="quiz-question-editor-container">
            <div className="quiz-question-editor-form">
                <div className="top-container">
                    <input ref={questionTextRef} aria-label="questionText" placeholder="QUESTION" className="question-text" type="text" />
                    <input ref={questionTypeRef} aria-label="questionType" className="question-type" type="@"/>
                </div>
                <div className="bottom-container">
                    <button className="button-save" onClick={() => { updateQuizQuestionOnClick() }}>
                        OK
                    </button>
                    <button className="button-cancel" onClick={() => { dispatch(removeQuizQuestion(props.question.id))}}>
                        CANCEL
                    </button>
                </div>
            </div>
        </form>
    )
}

export default QuizQuestionEditor 