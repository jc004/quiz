import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";
import Button from "../../components/Button/Button";
import "./Results.scss";

interface ResultsIProps extends RouteComponentProps {}
interface Question {
  question: string;
  correct_answer: string;
  selectedAnswer: string;
}

function Results(props: ResultsIProps) {
  const questions: Question[] = useSelector(
    (state: any) => state.trivia.questions
  );

  const correctAnswers: Question[] = questions.filter(
    (question) => question.selectedAnswer === question.correct_answer
  );

  const answers: string[] = questions.map(
    (question) => question.selectedAnswer
  );

  // redirect back to QuizStart if there are no answers
  useEffect(() => {
    if (answers.length === 0) {
      props.navigate && props.navigate("/");
    }
  }, [answers, props]);

  return (
    <div className="results">
      <h1>Thank You!</h1>
      <p>
        You answered <strong>{correctAnswers.length}</strong> out of{" "}
        <strong>{questions.length}</strong> questions correctly.
      </p>
      {questions.map((questionObj: Question) => {
        const { correct_answer, selectedAnswer, question } = questionObj;
        const isCorrectAnswer = selectedAnswer === correct_answer;
        return (
          <div className="result" key={question}>
            <p>
              <strong>Q: </strong>
              {decodeURIComponent(question)}
            </p>
            <p className={isCorrectAnswer ? "correct" : "incorrect"}>
              <strong>A: </strong>
              {decodeURIComponent(selectedAnswer)}
            </p>
            {!isCorrectAnswer && (
              <p>
                <strong>Correct Answer: </strong>
                {decodeURIComponent(correct_answer)}
              </p>
            )}
          </div>
        );
      })}
      <div>
        <Button onClick={() => props.navigate && props.navigate("/")}>
          Start New Quiz
        </Button>
      </div>
    </div>
  );
}

export default Results;
