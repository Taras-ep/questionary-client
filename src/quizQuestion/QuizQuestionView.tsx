import React from "react";
import { useDispatch } from "react-redux";
import { removeQuizQuestion, updateQuizQuestion } from "../Utils/Redux/QuizCatalogReducer.ts";
import QuizQuestion from "../models/QuizQuestion.ts";
import DeleteButton from "../Utils/DeleteButton.tsx";
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
                <DeleteButton onDelete={() => dispatch(removeQuizQuestion(props.question.id))} />
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