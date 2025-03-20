import React from "react";
import '../styles/QuizEditorPage.scss'
import '../styles/mediaRequests/main-page-media-requests.scss'
import { useDispatch } from "react-redux";
import QuizQuestion from "../quizQuestion/QuizQuestion.tsx";
import { addQuizQuestion } from "../Utils/Redux/QuizCatalogReducer.ts";
import { useSelector } from "react-redux";
import { QuizStore } from "../Utils/Redux/Store.ts";

const QuizEditorPage = () => {

    const dispatch = useDispatch()

    const quizQuestion = useSelector((state: QuizStore) => state.quizCatalog.quizQuestionsList)

    function addQuestionOnClick() {
        const newQuestion = {
            id: crypto.randomUUID(),
            questionText: null,
            questionType: null,
            isEdit: true
        };

        dispatch(addQuizQuestion(newQuestion));
    }

    return (
        <main className="quiz-editor-container">
            <div className="quiz-editor">
                {quizQuestion !== undefined && quizQuestion.length > 0 ? (
                    quizQuestion.map((question, index) => <QuizQuestion key={question.id} question={question} questionNumber={index + 1} />)
                ) : (
                    <div className="output-alt-text"><p>No questions yet</p></div>
                )}
                <button type="button" className="add-button" aria-label="add-button" onClick={addQuestionOnClick}><img src="../../icons/plus_icon.svg" className="add-button-img" alt="not-found" /></button>
            </div>
        </main>
    )
}

export default QuizEditorPage