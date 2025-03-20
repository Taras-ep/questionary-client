import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuiz } from "../Utils/Redux/QuizCatalogReducer.ts";
import '../styles/QuizSetUpPage.scss';

const QuizSetUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quizNameRef = useRef<HTMLInputElement>(null);
    const quizDescriptionRef = useRef<HTMLTextAreaElement>(null);

    const createNewQuiz = () => {
        if (quizNameRef.current && quizDescriptionRef.current) {
            const quizName = quizNameRef.current.value;
            const quizDescription = quizDescriptionRef.current.value;

            if (quizName && quizDescription) {
                const quizId = crypto.randomUUID(); 
                dispatch(addQuiz({ id: quizId, name: quizName, description: quizDescription }));
                navigate(`/EditQuiz/${quizId}`); 
            }
        }
    };

    return (
        <div className="quiz-set-up-page-container">
            <form className="quiz-form">
                <h2>Quiz Setup</h2>
                <div className="form-group">
                    <label htmlFor="quiz-name">Quiz Name</label>
                    <input
                        type="text"
                        ref={quizNameRef}
                        id="quiz-name"
                        placeholder="Enter quiz name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quiz-description">Description</label>
                    <textarea
                        id="quiz-description"
                        ref={quizDescriptionRef}
                        placeholder="Enter description"
                    />
                </div>
                <div className="buttons-container">
                    <button type="button" className="button cancle-btn" onClick={() => navigate('/')}>CANCEL</button>
                    <button type="button" className="button continue-btn" onClick={createNewQuiz}>CONTINUE</button>
                </div>
            </form>
        </div>
    );
};

export default QuizSetUpPage;
