import React from "react";
import { useDispatch } from "react-redux";
import { removeQuestionFromQuiz } from "../../Utils/Redux/QuizCatalogReducer.ts";
import { QuizQuestion } from "../../models/QuizQuestionState.ts";
import QuizQuestionView from "./QuizQuestionView.tsx";
import DeleteButton from "../utils/DeleteButton.tsx";
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

                <QuizQuestionView quizId={props.quizId} question={props.question} preview={true} />
                <button
                    aria-label="edit-question"
                    type="button"
                    className="button-edit"
                    onClick={() => { }}
                >
                    EDIT
                </button>
                <DeleteButton onDelete={() => dispatch(removeQuestionFromQuiz({ questionId: props.question.id, quizId: props.quizId }))} />
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

export default QuizQuestionEditorView