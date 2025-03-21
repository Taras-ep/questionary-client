import React from "react";
import './QuizEditorPage.scss';
import '../../styles/mediaRequests/main-page-media-requests.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../models/RootState.ts";
import { addQuizQuestion } from '../../Utils/Redux/QuizQuestionReducer.ts';
import { addQuestionToQuiz } from "../../Utils/Redux/QuizCatalogReducer.ts";
import { useParams, useNavigate } from "react-router-dom";
import QuizQuestion from "../quizQuestion/QuizQuestionEditor.tsx";
import saveQuizById from "../../Utils/Redux/API/saveQuizById.ts";
import { AppDispatch } from "../../Utils/Redux/Store.ts";

const QuizEditorPage = () => {
    const quizId = useParams<{ quizId: string }>().quizId!;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const quiz = useSelector((state: RootState) => state.quizzes.byId[quizId]);
    const allQuestions = useSelector((state: RootState) => state.questions.byId);
    const questions = quiz?.questions.map(questionId => allQuestions[questionId]);

    function addQuestionOnClick() {
        const questionId = crypto.randomUUID();
        const newQuestion = {
            id: questionId,
            questionText: null,
            questionType: null,
            isEdit: true
        };

        dispatch(addQuizQuestion(newQuestion));
        dispatch(addQuestionToQuiz({ quizId, questionId }));
    }

    async function saveChanges() {
        if (!quiz) return;
        
        try {
            await dispatch(saveQuizById({
                id: quiz.id,
                name: quiz.name!,
                description: quiz.description!,
                questions: questions
            }));
            
            navigate("/");
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    }

    function discardChanges() {
        navigate("/");
    }

    return (
        <main className="quiz-editor-container">
            <div className="quiz-editor">
                {questions !== undefined && questions.length > 0 ? (
                    questions.map((question, index) => (
                        <QuizQuestion quizId={quizId!} key={question.id} question={question} questionIndex={index} />
                    ))
                ) : (
                    <div className="output-alt-text"><p>No questions yet</p></div>
                )}
                <button type="button" className="add-button" aria-label="add-button" onClick={addQuestionOnClick}>
                    <img src="../../icons/plus_icon.svg" className="add-button-img" alt="not-found" />
                </button>

                <div className="quiz-editor-buttons">
                    <button type="button" className="save-button" onClick={saveChanges}>Save</button>
                    <button type="button" className="discard-button" onClick={discardChanges}>Discard</button>
                </div>
            </div>
        </main>
    );
};

export default QuizEditorPage;
