import { apiGenerateQuestions } from "../api/api";
import { AxiosResponse } from "axios";

export const TRIVIA_GENERATE = {
  BEGIN: "TRIVIA_GENERATE_BEGIN",
  SUCCESS: "TRIVIA_GENERATE_SUCCESS",
  ERROR: "TRIVIA_GENERATE_ERROR",
};

export const QUESTION_ANSWER = "QUESTION_ANSWER";

export const generateQuestions = () => {
  return (dispatch: any) => {
    dispatch({ type: TRIVIA_GENERATE.BEGIN });
    return apiGenerateQuestions()
      .then((response: AxiosResponse) => {
        return dispatch({
          type: TRIVIA_GENERATE.SUCCESS,
          payload: response.data.results,
        });
      })
      .catch((error) => {
        return dispatch({ type: TRIVIA_GENERATE.ERROR, error });
      });
  };
};

export const answerQuestion = (questionIndex: number, answer: string) => {
  return (dispatch: any) => {
    dispatch({
      type: QUESTION_ANSWER,
      answer: answer,
      questionIndex: questionIndex,
    });
  };
};
