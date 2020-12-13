import React from "react";
import classNames from "classnames";
import "./Button.scss";

interface ButtonIProps {
  children?: React.ReactNode;
  type?: any;
  onClick?: () => void;
  disabled?: boolean;
}

function Button(props: ButtonIProps) {
  const { children, onClick, type = "button", disabled = false } = props;
  const classProps = classNames("button");

  return (
    <button
      className={classProps}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
