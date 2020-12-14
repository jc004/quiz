import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../store/store";
import Question from "./Question";

const mockQuestion = {
  category: "Entertainment%3A%20Video%20Games",
  type: "multiple",
  difficulty: "medium",
  question:
    "In%20the%20%22Call%20Of%20Duty%3A%20Zombies%22%20map%20%22Moon%22%2C%20there%20is%20a%20secondary%20called%20the%20QED.%20What%20does%20QED%20stand%20for%3F",
  correct_answer: "Quantum%20Entanglement%20Device",
  incorrect_answers: [
    "Quad%20Ectoplasmic%20Driver",
    "Question%20Every%20Dog",
    "Quality%20Edward%20Device",
  ],
};

const MockQuestionComp = () => (
  <Provider store={store}>
    <Question question={mockQuestion} questionIndex={0} />
  </Provider>
);

//!! random insertion of 'correct_answer' will cause snapshots to fail
// test("it matches snapshot", () => {
//   const questionComp = render(<MockQuestionComp />);
//   expect(questionComp).toMatchSnapshot();
//   // screen.debug();
// });

test("it renders question text", () => {
  const { getByText, getByLabelText } = render(<MockQuestionComp />);

  getByText(
    'In the "Call Of Duty: Zombies" map "Moon", there is a secondary called the QED. What does QED stand for?'
  );
  getByLabelText("Quad Ectoplasmic Driver");
  getByLabelText("Quantum Entanglement Device");
  getByLabelText("Question Every Dog");
  getByLabelText("Quality Edward Device");
});

test("check radio values", () => {
  const { getByLabelText } = render(<MockQuestionComp />);

  const radio1 = getByLabelText(
    "Quantum Entanglement Device"
  ) as HTMLInputElement;
  fireEvent.change(radio1, {
    target: { value: "Quantum%20Entanglement%20Device" },
  });
  expect(radio1.value).toBe("Quantum%20Entanglement%20Device");

  const radio2 = getByLabelText("Quad Ectoplasmic Driver") as HTMLInputElement;
  fireEvent.change(radio2, {
    target: { value: "Quad%20Ectoplasmic%20Driver" },
  });
  expect(radio2.value).toBe("Quad%20Ectoplasmic%20Driver");

  const radio3 = getByLabelText("Question Every Dog") as HTMLInputElement;
  fireEvent.change(radio3, { target: { value: "Question%20Every%20Dog" } });
  expect(radio3.value).toBe("Question%20Every%20Dog");

  const radio4 = getByLabelText("Quality Edward Device") as HTMLInputElement;
  fireEvent.change(radio4, { target: { value: "Quality%20Edward%20Device" } });
  expect(radio4.value).toBe("Quality%20Edward%20Device");
});
