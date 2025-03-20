import React, { useRef, useState } from "react";
import '../styles/QuizSetUpPage.scss';
import { useNavigate } from "react-router-dom";

const QuizSetUpPage = () => {

    const navigate = useNavigate()
    const quizNameRef = useRef<HTMLInputElement>(null)
    const quizDescriptionRef = useRef<HTMLTextAreaElement>(null) 

    const handleSubmit = () => {

    };

    return (
        <div className="quiz-set-up-page-container">
            <form className="quiz-form" onSubmit={handleSubmit}>
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
                    <button type="button" className="button cancle-btn" onClick={() => navigate('/')}>CANCLE</button>
                    <button type="button" className="button continue-btn">CONTINUE</button>
                </div>
            </form>
        </div>
    );
};

export default QuizSetUpPage;