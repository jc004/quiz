import { TRIVIA_GENERATE, QUESTION_ANSWER } from "./triviaActions";

interface TriviaReducerState {
  loading: boolean;
  questions: any[];
  error: string | null;
  answers: string[];
}

const initialState: TriviaReducerState = {
  loading: false,
  questions: [],
  error: null,
  answers: [],
};

const triviaReducer = function (state = initialState, action: any) {
  switch (action.type) {
    case TRIVIA_GENERATE.BEGIN:
      return {
        ...state,
        loading: true,
      };
    case TRIVIA_GENERATE.SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload,
      };
    case TRIVIA_GENERATE.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case QUESTION_ANSWER:
      const updatedAnswers = [...state.answers];
      updatedAnswers[action.questionIndex] = action.answer;
      return {
        ...state,
        answers: updatedAnswers,
      };
  }
  return state;
};

export default triviaReducer;
