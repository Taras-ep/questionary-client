import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import QuizQuestionView from '../quizQuestion/QuizQuestionView.tsx';
import saveQuizAttempt from '../../Utils/Redux/API/saveQuizAttempt.ts';
import finishQuizAttempt from '../../Utils/Redux/API/finishQuizAttempt.ts';
import { RootState } from '../../models/RootState.ts';
import { AppDispatch } from '../../Utils/Redux/Store.ts';
import './QuizAttemptPage.scss';

const QuizAttemptPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { quizId } = useParams<{ quizId: string }>();
    const quiz = useSelector((state: RootState) => state.quizzes.byId[quizId!]);
    const allQuestions = useSelector((state: RootState) => state.questions.byId);
    const ifFinished = useSelector((state: RootState) => state.quizAttempt.isFinished)
    const quizQuestions = quiz.questionIds.map(questionId => allQuestions[questionId]);

    useEffect(() => {
        if (quizId) {
            const interval = setInterval(() => {
                dispatch(saveQuizAttempt(quizId));
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [dispatch, quizId]);

    useEffect(() => {
        if (ifFinished) {
            navigate('/')
        }
    }, [ifFinished, navigate])

    function onFinishQuizAttempt(quizId: string) {
        dispatch(finishQuizAttempt(quizId!))
    }

    return (
        <div className="take-quiz-page-container">
            {quizQuestions.map((value, index) => (
                <QuizQuestionView
                    key={index}
                    quizId={quizId!}
                    questionIndex={index}
                    question={value}
                    preview={false}
                />
            ))}
            <button type='button' onClick={() => { onFinishQuizAttempt(quizId!) }}>Submit</button>
        </div>
    );
};

export default QuizAttemptPage;