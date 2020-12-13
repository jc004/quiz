import { TRIVIA_GENERATE, QUESTION_ANSWER } from "./triviaActions";

interface quizSettingsState {
  amount: string;
  difficulty: string;
  type: string;
}
interface TriviaReducerState {
  loading: boolean;
  questions: any[];
  error: string | null;
  answers: string[];
  quizSettings: quizSettingsState;
}

const initialState: TriviaReducerState = {
  loading: false,
  questions: [],
  error: null,
  answers: [],
  quizSettings: {
    amount: "10",
    difficulty: "medium",
    type: "multiple",
  },
};

const triviaReducer = function (state = initialState, action: any) {
  switch (action.type) {
    case TRIVIA_GENERATE.SETTINGS:
      return {
        ...state,
        quizSettings: action.payload,
      };
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
