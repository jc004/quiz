import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { answerQuestion } from "../../store/triviaActions";
import "./Question.scss";

interface QuestionIProps extends RouteComponentProps {
  questionIndex: number;
}

function Question(props: QuestionIProps) {
  const [answers, setAnswers] = useState<string[]>([]);

  const question = useSelector(
    (state: any) => state.trivia.questions[props.questionIndex]
  );
  const currentAnswer = useSelector((state: any) => {
    return state.trivia.answers[props.questionIndex];
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Add correct answer to incorrect answers at random position
    const answers = [...question.incorrect_answers];
    answers.splice(
      Math.floor(Math.random() * question.incorrect_answers.length),
      0,
      question.correct_answer
    );
    setAnswers(answers);
  }, [question.correct_answer, question.incorrect_answers]);

  const onChange = (e: any) => {
    dispatch(answerQuestion(props.questionIndex, e.target.value));
  };

  return (
    <div className="question">
      <h3>{decodeURIComponent(question.question)}</h3>
      {answers?.map((a, i) => {
        return (
          <label key={i}>
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
