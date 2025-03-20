import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import QuizQuestionView from '../quizQuestion/QuizQuestionView.tsx';
import submitQuiz from '../../Utils/Redux/API/submitQuiz.ts';
import { RootState } from '../../models/RootState.ts';
import { AppDispatch } from '../../Utils/Redux/Store.ts';
import './QuizAttemptPage.scss';

const QuizAttemptPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { quizId } = useParams<{ quizId: string }>();

    
    const quiz = useSelector((state: RootState) => state.quizzes.byId[quizId!])
    const allQuestions = useSelector((state: RootState) =>state.questions.byId)
    const quizQuestions = quiz?.questions.map(questionId => allQuestions[questionId])

    return (
        <div className="take-quiz-page-container">
            {
                quizQuestions.map((value, index) => {
                    return <QuizQuestionView key={index} quizId={quizId!} questionIndex={index} question={value}/>
                })
            }
            <button onClick={() => dispatch(submitQuiz(quizId!))}>Sumbit</button>
        </div>
    );
};

export default QuizAttemptPage;
