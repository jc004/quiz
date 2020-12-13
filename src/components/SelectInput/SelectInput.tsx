import React from "react";
import Select from "react-select";

interface option {
  value: string;
  label: string;
}

interface Props {
  placeholder?: string;
  options: option[];
  onChange: (e: any) => void;
}

const SelectInput = ({ placeholder, options, onChange }: Props) => (
  <Select placeholder={placeholder} options={options} onChange={onChange} />
);

export default SelectInput;
