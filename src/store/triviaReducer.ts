import { TRIVIA_GENERATE, QUESTION_ANSWER } from "./triviaActions";

interface QuizSettingsState {
  amount: string;
  difficulty: string;
  type: string;
}

export interface QuestionInterface {
  selectedAnswer?: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
interface TriviaReducerState {
  loading: boolean;
  questions: QuestionInterface[];
  error: string | null;
  quizSettings: QuizSettingsState;
}

const initialState: TriviaReducerState = {
  loading: false,
  questions: [],
  error: null,
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
        error: null,
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
      const updatedQuestions = [...state.questions];
      updatedQuestions[action.questionIndex] = {
        ...state.questions[action.questionIndex],
        selectedAnswer: action.answer,
      };
      return {
        ...state,
        questions: updatedQuestions,
      };
  }
  return state;
};

export default triviaReducer;
