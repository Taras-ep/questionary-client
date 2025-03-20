import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeQuestionFromQuiz } from "../../Utils/Redux/QuizCatalogReducer.ts";
import { QuizQuestion, MULTIPLE_CHOICE_QUESTION_TYPE, TEXT_QUESTIO0N_TYPE, SINGLE_CHOICE_QUESTION_TYPE } from "../../models/QuizQuestionState.ts";
import DeleteButton from "../utils/DeleteButton.tsx";
import './QuizQuestion.scss'
import { setUserAnswer } from "../../Utils/Redux/QuizAttemptReducer.ts";

interface QuizQuestionViewProps {
    quizId: string,
    questionIndex: number,
    question: QuizQuestion,
}

const QuizQuestionView = (props: QuizQuestionViewProps) => {
    const dispatch = useDispatch()

    const [inputText, setInputText] = useState("")
    const [selectedChoices, setSelectedChoices] = useState<Set<number>>(new Set())

    function setAnswer(answer: string | number[]) {
        dispatch(setUserAnswer({
            questionId: props.question.id,
            questionIndex: props.questionIndex,
            answer: answer
        }))
    }

    function renderTextInput() {
        return <label>
            <input
                type="text"
                name="inputText"
                value={inputText}
                onChange={e => {
                    const value = e.target.value
                    setInputText(value)
                    setAnswer(value)
                }}
            />
            Text:
        </label>
    }

    function renderOptionsInput(isMultiple: boolean) {
        return props.question.options?.map((value, index) => (
            <label key={value}>
                <input
                    type={isMultiple ? "checkbox" : "radio"}
                    name="options"
                    value={value}
                    checked={selectedChoices.has(index)}
                    onChange={e => {
                        let updatedChoices = new Set(selectedChoices); 

                        if (!isMultiple) {
                            updatedChoices.clear()
                        }

                        if (!updatedChoices.has(index)) {
                            updatedChoices.add(index)
                        } else {
                            updatedChoices.delete(index)
                        }
                        console.log("IS CHECKED " + e.target.checked)
                        console.log("IS CHECKED " + Array.from(selectedChoices))
                        setSelectedChoices(updatedChoices)

                        setAnswer(Array.from(updatedChoices))
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
                <div className="quiz-question-index">{props.questionIndex + 1}</div>
                <div className="quiz-question-output">{props.question.questionText}</div>
                {renderInputs(props.question.questionType!)}
            </div>
        </div>
    )
}

/*
{
    const [selected, setSelected] = useState<string>("");

    const addOption = () => {
        const newValue = `option-${option.length + 1}`;
        setOption([...option, newValue]);
    };

    option.map((value) => (
         <label key={value}>
             <input
                 type="radio"
                 name="options"
                 value={value}
                 checked={selected === value}
                 onChange={() => setSelected(value)}
             />
             {value}
         </label>
     ))
}
    */

export default QuizQuestionView