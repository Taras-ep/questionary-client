import React from "react";
import '../styles/QuizCatalog.scss'

const QuizCatalog = () => {
    return (
        <div className="quiz-catalog">
            <h2>Quiz Catalog</h2>
            <div className="quiz-list">
                <div className="quiz-card add-card">
                    <span className="plus">+</span>
                </div>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="quiz-card">
                        <h3>Quiz name</h3>
                        <p>Quiz description</p>
                        <a href="#">Questions: 17</a>
                        <span className="menu">⋮</span>
                    </div>
                ))}
            </div>
            <div className="pagination">Pagination here</div>
        </div>
    );
};

export default QuizCatalog;
