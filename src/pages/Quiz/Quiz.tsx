import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "@reach/router";
import Question from "../../components/Question/Question";
import Button from "../../components/Button/Button";
import { generateQuestions } from "../../store/triviaActions";
import "./Quiz.scss";

interface QuizIProps extends RouteComponentProps {}
interface Question {
  selectedAnswer: string | undefined;
}

function Quiz(props: QuizIProps) {
  const dispatch = useDispatch();
  const quizSettings = useSelector((state: any) => state.trivia.quizSettings);
  const questions: [] = useSelector((state: any) => state.trivia.questions);
  // const answers: [] = useSelector((state: any) => state.trivia.answers).filter(
  //   (answer: string) => answer !== null || answer !== undefined
  // );
  const selectedAnswers = questions.filter(
    (question: { selectedAnswer: string | undefined }) =>
      question.selectedAnswer !== undefined
  );
  console.log("selectedAnswers", selectedAnswers);

  const loading: boolean = useSelector((state: any) => state.trivia.loading);
  const error: boolean = useSelector((state: any) => state.trivia.error);
  console.log("questions", questions);

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
    return <h3>Sorry something went wrong</h3>;
  }

  if (loading && !error) {
    return <h3>Loading questions...</h3>;
  }

  return (
    <div>
      {questions.map((q, i) => {
        return <Question questionIndex={i} key={i} />;
      })}
      <div className="complete">
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
