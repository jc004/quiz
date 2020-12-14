import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";
import Question from "../../components/Question/Question";
import Button from "../../components/Button/Button";
import { generateQuestions } from "../../store/triviaActions";
import { QuestionInterface } from "../../store/triviaReducer";
import "./Quiz.scss";

interface QuizIProps extends RouteComponentProps {}

function Quiz(props: QuizIProps) {
  const dispatch = useDispatch();
  const quizSettings = useSelector((state: any) => state.trivia.quizSettings);
  const questions: [] = useSelector((state: any) => state.trivia.questions);
  const loading: boolean = useSelector((state: any) => state.trivia.loading);
  const error: { message: string } = useSelector(
    (state: any) => state.trivia.error
  );

  const selectedAnswers = questions.filter(
    (question: QuestionInterface) => question.selectedAnswer !== undefined
  );

  useEffect(() => {
    const { amount, difficulty, type } = quizSettings;
    dispatch(
      generateQuestions(
        `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&encode=url3986`
      )
    );
    // eslint-disable-next-line
  }, [quizSettings]);

  // Check if all questions are answered to display Complete button
  const hasUnansweredQuestions = selectedAnswers.length !== questions.length;

  if (error) {
    return (
      <div className="Quiz-error">
        <h3>Sorry something went wrong:</h3>
        <p>{error.message}</p>
        <p>Please check your internet connection and try again</p>
        <Button onClick={() => props.navigate && props.navigate("/")}>
          Try again?
        </Button>
      </div>
    );
  }

  if (loading && !error) {
    return <h3 className="Quiz-loading">Loading questions...</h3>;
  }

  return (
    <div className="Quiz">
      {questions.map((question: QuestionInterface, index) => {
        return (
          <Question
            question={question}
            questionIndex={index}
            key={question.question}
          />
        );
      })}
      <div className="Quiz-complete">
        {hasUnansweredQuestions ? (
          <p>Please answer ALL questions</p>
        ) : (
          <p>Please submit your answers...</p>
        )}
        <Button
          disabled={hasUnansweredQuestions}
          onClick={() => props.navigate && props.navigate("/results")}
        >
          Complete Quiz
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
