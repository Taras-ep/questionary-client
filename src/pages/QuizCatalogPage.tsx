// QuizCatalog.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../models/RootState";
import '../styles/QuizCatalog.scss';
import { useNavigate } from "react-router-dom";

const QuizCatalog = () => {
    const navigate = useNavigate();
    const quizzes = useSelector((state: RootState) => state.quizzes.allIds); 
    const quizById = useSelector((state: RootState) => state.quizzes.byId);

    function quizSetUpHandleClick() {
        navigate('/QuizSetUpPage');
    }

    return (
        <div className="quiz-catalog">
            <h2>Quiz Catalog</h2>
            <div className="quiz-list">
                <div className="quiz-card add-card" onClick={quizSetUpHandleClick}>
                    <span className="plus">+</span>
                </div>
                {quizzes.length === 0 ? (
                    <p>No quizzes available</p>
                ) : (
                    quizzes.map((quizId) => {
                        const quiz = quizById[quizId];
                        return (
                            <div key={quizId} className="quiz-card">
                                <h3>{quiz.name}</h3>
                                <p>{quiz.description}</p>
                                <a href="#">Questions: {quiz.questions.length}</a>
                                <span className="menu">⋮</span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default QuizCatalog;
