import React from "react";
import { RouteComponentProps } from "@reach/router";
import Button from "../../components/Button/Button";
import "./Results.scss";

interface ResultsIProps extends RouteComponentProps {}

function Results(props: ResultsIProps) {
  return (
    <div className="results">
      <h1>Thank You!</h1>
      <div>
        <Button onClick={() => props.navigate && props.navigate("/")}>
          Start New Quiz
        </Button>
      </div>
    </div>
  );
}

export default Results;
