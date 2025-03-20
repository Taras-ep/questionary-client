import React, { useRef, useState } from "react";
import '../styles/UserQuizQuestionForm.scss'
import { useDispatch } from "react-redux";
import { removeQuizQuestion, updateQuizQuestion } from "../Utils/Redux/QuizCatalogReducer.ts";
import QuizQuestion from "../models/QuizQuestion.ts";
import DeleteButton from "../Utils/DeleteButton.tsx";

interface QuizQuestionEditorProps {
    question: QuizQuestion,
    questionNumber: number
}

const QuizQuestionEditor = (props: QuizQuestionEditorProps) => {

    const dispatch = useDispatch()

    const questionTextRef = useRef<HTMLInputElement>(null)
    const [questionType, setQuestionType] = useState<string>('Text')
    const [options, setOptions] = useState<string[]>([]);

    const showOptions = questionType === 'Single choice' || questionType === 'Multiple choice'

    const addOption = () => {
        setOptions([...options, '']);
    };


    function updateQuizQuestionOnClick() {
        if (questionTextRef.current) {
            const updatedQuestion: QuizQuestion = {
                id: props.question.id,
                questionText: questionTextRef.current.value,
                questionType: questionType,
                isEdit: false,
                options: options
            };

            dispatch(updateQuizQuestion(updatedQuestion));
        }
    }

    function renderAddChoiceButton() {
        return (
            <div className="middle-container">
                <button type="button" className="add-choice" onClick={addOption}>ADD CHOICE</button>
            </div>
        )
    }

    function renderOptions() {
        return options.map((value, index) => (
            <div key={index} className="input-option-container">
                <label>
                    {(index + 1) + '. '}
                    <input
                        className="option-input"
                        type="text"
                        value={value}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                </label>
                <DeleteButton onDelete={() => removeOption(index)} />
            </div>
        ));
    }
    
    const removeOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    return (
        <form className="quiz-question-editor-container">
            <div className="quiz-question-editor-form">
                <div className="top-container">
                    <input ref={questionTextRef} aria-label="questionText" placeholder="QUESTION" className="question-text" type="text" />
                    <select onChange={(e) => { setQuestionType(e.target.value) }} title="question-type" name="select-question-type" className="question-type-selection">
                        <option>Text</option>
                        <option>Single choice</option>
                        <option>Multiple choice</option>
                    </select>
                </div>

                {showOptions ? renderOptions() : null}
                {showOptions ? renderAddChoiceButton() : null}

                <div className="bottom-container">
                    <button type="button" className="button-save" onClick={() => { updateQuizQuestionOnClick() }}>
                        OK
                    </button>
                    <button type="button" className="button-cancel" onClick={() => { dispatch(removeQuizQuestion(props.question.id)) }}>
                        CANCEL
                    </button>
                </div>
            </div>
        </form>
    )
}

export default QuizQuestionEditor 