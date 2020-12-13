import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeQuizSettings } from "../../store/triviaActions";
import { RouteComponentProps } from "@reach/router";
import Button from "../../components/Button/Button";
import SelectInput from "../../components/SelectInput/SelectInput";
import "./StartQuiz.scss";
interface TriviaIProps extends RouteComponentProps {}

function Trivia(props: TriviaIProps) {
  const dispatch = useDispatch();

  const [quizSettings, setQuizSettings] = useState(
    useSelector((state: any) => state.trivia.quizSettings)
  );

  const startQuiz = () => {
    dispatch(storeQuizSettings(quizSettings));
    props.navigate && props.navigate("/quiz");
  };

  return (
    <div className="StartQuiz">
      <SelectInput
        placeholder="Select difficulty ..."
        options={[
          {
            value: "easy",
            label: "Easy",
          },
          {
            value: "medium",
            label: "Medium",
          },
          {
            value: "hard",
            label: "Hard",
          },
        ]}
        onChange={(e: { value: string; label: string }) =>
          setQuizSettings({
            ...quizSettings,
            difficulty: e.value,
          })
        }
      />
      <SelectInput
        placeholder="Select type ..."
        options={[
          {
            value: "boolean",
            label: "True / False",
          },
          {
            value: "multiple",
            label: "Multiple Choice",
          },
        ]}
        onChange={(e: { value: string; label: string }) =>
          setQuizSettings({
            ...quizSettings,
            type: e.value,
          })
        }
      />

      <SelectInput
        placeholder="Select amount ..."
        options={[
          {
            value: "3",
            label: "3",
          },
          {
            value: "10",
            label: "10",
          },
          {
            value: "20",
            label: "20",
          },
          {
            value: "30",
            label: "30",
          },
          {
            value: "40",
            label: "40",
          },
          {
            value: "50",
            label: "50",
          },
        ]}
        onChange={(e: { value: string; label: string }) =>
          setQuizSettings({
            ...quizSettings,
            amount: e.value,
          })
        }
      />
      <Button onClick={() => startQuiz()}>Start Quiz</Button>
    </div>
  );
}

export default Trivia;
