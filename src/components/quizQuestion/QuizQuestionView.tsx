import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeQuestionFromQuiz } from "../../Utils/Redux/QuizCatalogReducer.ts";
import { QuizQuestion, MULTIPLE_CHOICE_QUESTION_TYPE, TEXT_QUESTIO0N_TYPE, SINGLE_CHOICE_QUESTION_TYPE } from "../../models/QuizQuestionState.ts";
import DeleteButton from "../utils/DeleteButton.tsx";
import './QuizQuestionView.scss'
import { setUserAnswer } from "../../Utils/Redux/QuizAttemptReducer.ts";

interface QuizQuestionViewProps {
    preview: boolean,
    quizId: string,
    questionIndex?: number,
    question: QuizQuestion,
}

const QuizQuestionView = (props: QuizQuestionViewProps) => {
    const dispatch = useDispatch()

    const [inputText, setInputText] = useState(!props.preview ? "" : "Answer")
    const [selectedChoices, setSelectedChoices] = useState<Set<number>>(!props.preview ? new Set() : new Set([0]))

    function setAnswer(answer: string | number[]) {
        dispatch(setUserAnswer({
            questionId: props.question.id,
            questionIndex: props.questionIndex!,
            answer: answer
        }))
    }

    function renderTextInput() {
        return <label>
            Answer:
            <input
                disabled={props.preview}
                type="text"
                name="inputText"
                value={inputText}
                onChange={e => {
                    if (!props.preview) {
                        const value = e.target.value
                        setInputText(value)
                        setAnswer(value)
                    }
                }}
            />
        </label>
    }

    function renderOptionsInput(isMultiple: boolean) {
        return props.question.options?.map((value, index) => (
            <label key={value}>
                <input
                    disabled={props.preview}
                    type={isMultiple ? "checkbox" : "radio"}
                    name="options"
                    value={value}
                    checked={selectedChoices.has(index)}
                    onChange={() => {
                        if (!props.preview) {

                            let updatedChoices = new Set(selectedChoices);

                            if (!isMultiple) {
                                updatedChoices.clear()
                            }

                            if (!updatedChoices.has(index)) {
                                updatedChoices.add(index)
                            } else {
                                updatedChoices.delete(index)
                            }
                            setSelectedChoices(updatedChoices)

                            setAnswer(Array.from(updatedChoices))
                        }
                    }}
                />
                {value}
            </label>
        ))
    }

    function renderInputs(qustionType: string) {
        switch (qustionType) {
            case TEXT_QUESTIO0N_TYPE: return renderTextInput()
            case SINGLE_CHOICE_QUESTION_TYPE: return renderOptionsInput(false)
            case MULTIPLE_CHOICE_QUESTION_TYPE: return renderOptionsInput(true)
        }
    }

    return (
        <div className="quiz-question-view-container">
            <div className="top-view-container">
                {props.questionIndex ? <div className="quiz-question-index">{props.questionIndex + 1}</div> : null}
                <div className="quiz-question-output">{props.question.questionText}</div>
                {renderInputs(props.question.questionType!)}
            </div>
        </div>
    )
}

export default QuizQuestionView