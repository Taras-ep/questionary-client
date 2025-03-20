import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../models/RootState.ts";
import "./QuizCatalogPage.scss";
import { addQuiz } from "../../Utils/Redux/QuizCatalogReducer.ts";
import { useNavigate } from "react-router-dom";
import { clearAnswers } from "../../Utils/Redux/QuizAttemptReducer.ts";
import QuizCard from "../quiz/QuizCard.tsx";
import InfiniteScroll from "react-infinite-scroll-component";

const QUIZZES_PER_LOAD = 4;

const QuizCatalog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quizzesId = useSelector((state: RootState) => state.quizzes.allIds);
    const quizById = useSelector((state: RootState) => state.quizzes.byId);
    const quizzes = quizzesId.map(quizId => quizById[quizId]).filter(quiz => !quiz.isHidden)

    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    function handleClick(quizId: string) {
        setActiveMenuId((prev) => (prev === quizId ? null : quizId));
    }

    function quizSetUpHandleClick() {
        navigate("/QuizSetUpPage");
    }

    function quizStartHandleClick(quizId: string) {
        dispatch(clearAnswers());
        navigate(`StartQuiz/${quizId}`);
    }

    return (
        <div className="quiz-catalog">
            <h2>Quiz Catalog</h2>
            <div className="quiz-list">
                <div className="quiz-card add-card" onClick={quizSetUpHandleClick}>
                    <span className="plus">+</span>
                </div>
                <InfiniteScroll
                        dataLength={quizzes.length}
                        next={() => {
                            dispatch(addQuiz({id: crypto.randomUUID(), description:"fdff", name:"Fdfdf"}))
                        }}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p style={{ textAlign: "center" }}>No more quizzes</p>}
                    >
                {quizzes.length === 0 ? (
                    <p>No quizzes available</p>
                ) : (
                    quizzes.map((quiz) => {
                        return (
                            <QuizCard
                                key={quiz.id}
                                quizId={quiz.id}
                                quiz={quiz}
                                isMenuActive={activeMenuId === quiz.id}
                                onOptionsClick={() => handleClick(quiz.id)}
                                onCardClick={() => quizStartHandleClick(quiz.id)}
                            />
                        );
                    })
                )}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default QuizCatalog;
