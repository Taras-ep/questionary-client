import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addQuiz, editQuiz } from "../../Utils/Redux/QuizCatalogReducer.ts";
import { RootState } from "../../models/RootState.ts";
import './QuizSetUpPage.scss';

const QuizSetUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizId } = useParams<{ quizId: string }>();
    const quiz = useSelector((state: RootState) => quizId ? state.quizzes.byId[quizId] : null);

    const quizNameRef = useRef<HTMLInputElement>(null);
    const quizDescriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!quiz) return;
        if (!quizNameRef.current || !quizDescriptionRef.current) return;

        quizNameRef.current.value = quiz.name ?? '';
        quizDescriptionRef.current.value = quiz.description ?? '';
    }, [quiz]);


    const handleSave = () => {
        if (quizNameRef.current && quizDescriptionRef.current) {
            const quizName = quizNameRef.current.value;
            const quizDescription = quizDescriptionRef.current.value;

            if (quizName && quizDescription) {
                let targetQuizId = crypto.randomUUID();

                if (quizId) {
                    dispatch(editQuiz({ id: quizId, newId: targetQuizId, name: quizName, description: quizDescription }));
                } else {
                    dispatch(addQuiz({ id: targetQuizId, name: quizName, description: quizDescription }));
                }
                navigate(`/EditQuiz/${targetQuizId}`);
            }
        }
    };

    return (
        <div className="quiz-set-up-page-container">
            <form className="quiz-form">
                <h2>{quizId ? "Edit Quiz" : "Create Quiz"}</h2>
                <div className="form-group">
                    <label htmlFor="quiz-name">Quiz Name</label>
                    <input type="text" ref={quizNameRef} id="quiz-name" placeholder="Enter quiz name" />
                </div>
                <div className="form-group">
                    <label htmlFor="quiz-description">Description</label>
                    <textarea id="quiz-description" ref={quizDescriptionRef} placeholder="Enter description" />
                </div>
                <div className="buttons-container">
                    <button type="button" className="button cancle-btn" onClick={() => navigate('/')}>CANCEL</button>
                    <button type="button" className="button continue-btn" onClick={handleSave}>
                        CONTINUE
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizSetUpPage;
