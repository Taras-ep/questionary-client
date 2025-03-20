import React, { useRef, useState } from "react";
import './UserQuizQuestionForm.scss'
import { useDispatch } from "react-redux";
import { replaceQuestionInQuiz, removeQuestionFromQuiz } from "../../Utils/Redux/QuizCatalogReducer.ts";
import { addQuizQuestion, updateQuizQuestion, removeQuizQuestion } from "../../Utils/Redux/QuizQuestionReducer.ts";
import { QuizQuestion, TEXT_QUESTIO0N_TYPE, MULTIPLE_CHOICE_QUESTION_TYPE, SINGLE_CHOICE_QUESTION_TYPE } from "../../models/QuizQuestionState.ts";
import DeleteButton from "../utils/DeleteButton.tsx";

interface QuizQuestionEditorFormProps {
    quizId: string,
    question: QuizQuestion,
    questionNumber: number
}

const QuizQuestionEditorForm = (props: QuizQuestionEditorFormProps) => {

    const dispatch = useDispatch()

    const [questionText, setQuestionText] = useState(props.question.questionText || "")
    const [questionType, setQuestionType] = useState<string>(props.question.questionType || "Text")
    const [options, setOptions] = useState<string[]>(props.question.options || []);

    const showOptions = questionType === 'Single choice' || questionType === 'Multiple choice'

    const addOption = () => {
        setOptions([...options, '']);
    };


    function updateQuizQuestionOnClick() {
        const newQuestionId = crypto.randomUUID()
        const oldQuestionId = props.question.id
        const updatedQuestion: QuizQuestion = {
            id: newQuestionId,
            questionText: questionText,
            questionType: questionType,
            isEdit: false,
            options: options
        };

        dispatch(updateQuizQuestion({ oldQuestionId, question: updatedQuestion }));
        dispatch(replaceQuestionInQuiz({ quizId: props.quizId, oldQuestionId, newQuestionId }));
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
                    <input onChange={e => setQuestionText(e.target.value)}
                        value={questionText}
                        aria-label="questionText"
                        placeholder="QUESTION"
                        className="question-text"
                        type="text" />
                    <select onChange={(e) => { setQuestionType(e.target.value) }}
                        value={questionType || ''}
                        title="question-type"
                        name="select-question-type"
                        className="question-type-selection">
                        <option>{TEXT_QUESTIO0N_TYPE}</option>
                        <option>{SINGLE_CHOICE_QUESTION_TYPE}</option>
                        <option>{MULTIPLE_CHOICE_QUESTION_TYPE}</option>
                    </select>
                </div>

                {showOptions ? renderOptions() : null}
                {showOptions ? renderAddChoiceButton() : null}

                <div className="bottom-container">
                    <button type="button" className="button-save" onClick={() => { updateQuizQuestionOnClick() }}>
                        OK
                    </button>
                    <button type="button" className="button-cancel" onClick={() => {
                        dispatch(removeQuestionFromQuiz({ quizId: props.quizId, questionId: props.question.id }))
                    }}>
                        CANCEL
                    </button>
                </div>
            </div>
        </form>
    )
}

export default QuizQuestionEditorForm 