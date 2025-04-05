import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Utils/Redux/Store.ts";
import { QuizQuestion, MULTIPLE_CHOICE_QUESTION_TYPE, TEXT_QUESTIO0N_TYPE, SINGLE_CHOICE_QUESTION_TYPE } from "../../models/QuizQuestionState.ts";
import DeleteButton from "../utils/DeleteButton.tsx";
import "./QuizQuestionView.scss";
import { setUserAnswer } from "../../Utils/Redux/QuizAttemptReducer.ts";
import { debounce } from "lodash";

interface QuizQuestionViewProps {
    preview: boolean,
    quizId: string,
    questionIndex?: number,
    question: QuizQuestion,
}

const QuizQuestionView = (props: QuizQuestionViewProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [inputText, setInputText] = useState(!props.preview ? "" : "Answer");
    const [selectedChoices, setSelectedChoices] = useState<Set<number>>(!props.preview ? new Set() : new Set([0]));
    const [lastAnswer, setLastAnswer] = useState<string | number[] | null>(null);
  
    const debouncedSetAnswer = debounce((answer: string | number[]) => {
      if (JSON.stringify(answer) !== JSON.stringify(lastAnswer)) {
        dispatch(setUserAnswer({
          questionId: props.question.id,
          questionIndex: props.questionIndex!,
          answer: answer
        }));
        setLastAnswer(answer);
      }
    }, 300);
  
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setInputText(value);
      if (!props.preview) {
        debouncedSetAnswer(value);
      }
    }
  
    function handleChoiceChange(index: number, isMultiple: boolean) {
      if (!props.preview) {
        const updatedChoices = new Set(selectedChoices);
        if (!isMultiple) updatedChoices.clear();
        updatedChoices.has(index) ? updatedChoices.delete(index) : updatedChoices.add(index);
        setSelectedChoices(updatedChoices);
        debouncedSetAnswer(Array.from(updatedChoices));
      }
    }
  
    function renderTextInput() {
      return (
        <label>
          Answer:
          <input
            disabled={props.preview}
            type="text"
            name="inputText"
            value={inputText}
            onChange={handleInputChange}
          />
        </label>
      );
    }
  
    function renderOptionsInput(isMultiple: boolean) {
      return props.question.options?.map((value, index) => (
        <label key={value}>
          <input
            disabled={props.preview}
            type={isMultiple ? "checkbox" : "radio"}
            name="options"
            value={value}
            checked={selectedChoices.has(index)}
            onChange={() => handleChoiceChange(index, isMultiple)}
          />
          {value}
        </label>
      ));
    }
  
    function renderInputs(questionType: string) {
      switch (questionType) {
        case TEXT_QUESTIO0N_TYPE: return renderTextInput();
        case SINGLE_CHOICE_QUESTION_TYPE: return renderOptionsInput(false);
        case MULTIPLE_CHOICE_QUESTION_TYPE: return renderOptionsInput(true);
        default: return null;
      }
    }
  
    return (
      <div className="quiz-question-view-container">
        <div className="top-view-container">
          {props.questionIndex !== undefined && <div className="quiz-question-index">{props.questionIndex + 1}</div>}
          <div className="quiz-question-output">{props.question.questionText}</div>
          {renderInputs(props.question.questionType!)}
        </div>
      </div>
    );
  };
  
  export default QuizQuestionView;