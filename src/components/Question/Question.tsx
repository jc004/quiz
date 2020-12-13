import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { answerQuestion } from "../../store/triviaActions";
import "./Question.scss";

interface QuestionIProps extends RouteComponentProps {
  questionIndex: number;
}

function Question(props: QuestionIProps) {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState<string[]>([]);

  const question = useSelector(
    (state: any) => state.trivia.questions[props.questionIndex]
  );

  useEffect(() => {
    let answers = [...question.incorrect_answers];
    // Add correct answer to incorrect answers at random position
    if (question.type === "multiple") {
      answers.splice(
        Math.floor(Math.random() * question.incorrect_answers.length),
        0,
        question.correct_answer
      );
    }

    // if True / False, place True first
    if (question.type === "boolean") {
      question.correct_answer === "True"
        ? answers.unshift(question.correct_answer)
        : answers.push(question.correct_answer);
    }

    setAnswers(answers);
  }, [question.correct_answer, question.incorrect_answers, question.type]);

  const onChange = (e: any) => {
    dispatch(answerQuestion(props.questionIndex, e.target.value));
  };

  const currentAnswer = question.selectedAnswer;

  return (
    <div className="question">
      <h3>{decodeURIComponent(question.question)}</h3>
      {answers?.map((a) => {
        return (
          <label key={a}>
            <input
              type="radio"
              name={`question-${props.questionIndex}`}
              value={a}
              checked={currentAnswer === a}
              onChange={onChange}
            />
            <span>{decodeURIComponent(a)}</span>
          </label>
        );
      })}
    </div>
  );
}

export default Question;
