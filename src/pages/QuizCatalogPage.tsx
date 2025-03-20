import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../models/RootState";
import "../styles/QuizCatalog.scss";
import { useNavigate } from "react-router-dom";
import { clearAnswers } from "../Utils/Redux/QuizAttemptReducer.ts";
import QuizCard from "../quiz/QuizCard.tsx";

const QuizCatalog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quizzes = useSelector((state: RootState) => state.quizzes.allIds);
    const quizById = useSelector((state: RootState) => state.quizzes.byId);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    function handleClick(quizId: string) {
        setActiveMenuId((prev) => (prev === quizId ? null : quizId));
    }

    function quizSetUpHandleClick() {
        navigate("/QuizSetUpPage");
    }

    function quizStartHandleClick(quizId: string) {
        dispatch(clearAnswers())
        navigate(`StartQuiz/${quizId}`);
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
                            <QuizCard
                                key={quizId}
                                quizId={quizId}
                                quiz={quiz}
                                isMenuActive={activeMenuId === quizId}
                                onOptionsClick={() => handleClick(quizId)}
                                onCardClick={() => quizStartHandleClick(quizId)}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default QuizCatalog;
