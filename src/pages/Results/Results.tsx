import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";
import Button from "../../components/Button/Button";
import "./Results.scss";

interface ResultsIProps extends RouteComponentProps {}
interface Question {
  question: string;
  correct_answer: string;
}

function Results(props: ResultsIProps) {
  const questions: [] = useSelector((state: any) => state.trivia.questions);
  const answers: [] = useSelector((state: any) => state.trivia.answers);
  return (
    <div className="results">
      <h1>Thank You!</h1>
      {questions.map((question: Question, index) => (
        <div>
          <p>
            <strong>Q: </strong>
            {decodeURIComponent(question.question)}
          </p>
          <p>
            <strong>A: </strong>
            {decodeURIComponent(answers[index])}
          </p>
        </div>
      ))}
      <div>
        <Button onClick={() => props.navigate && props.navigate("/")}>
          Start New Quiz
        </Button>
      </div>
    </div>
  );
}

export default Results;
