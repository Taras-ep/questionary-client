import React from "react";
import { deleteQuiz, editQuiz } from "../Utils/Redux/QuizCatalogReducer.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
    quizId: string;
    quiz: any;
    isMenuActive: boolean;
    onCardClick: () => void;
    onOptionsClick: () => void;
}

const QuizCard = ({ quizId, quiz, isMenuActive, onCardClick, onOptionsClick }: QuizCardProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="quiz-card" onClick={onCardClick}>
            {isMenuActive && (
                <div className="quiz-card-menu">
                    <div className="buttons-container">
                        <button
                            type="button"
                            className="button delete-btn"
                            onClick={e => {
                                e.stopPropagation()
                                dispatch(deleteQuiz({ id: quizId }))
                            }}>
                            DELETE
                        </button>
                        <button
                            type="button"
                            className="button edit-btn"
                            onClick={e => {
                                e.stopPropagation()
                                navigate(`/QuizSetUpPage/${quizId}`);
                                onOptionsClick();
                            }}>
                            EDIT
                        </button>
                    </div>
                    <button type="button" className="button back-btn" onClick={e => {
                        e.stopPropagation()
                        onOptionsClick()
                    }}>BACK</button>
                </div>
            )}
            <h3>{quiz.name}</h3>
            <p>{quiz.description}</p>
            <a href="#">Questions: {quiz.questions.length}</a>
            <button onClick={e => {
                e.stopPropagation()
                onOptionsClick()
            }} type="button" className="menu">⋮</button>
        </div>
    );
};


export default QuizCard;
