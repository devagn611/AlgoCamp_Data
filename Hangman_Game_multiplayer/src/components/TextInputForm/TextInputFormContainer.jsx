import { useState } from "react";
import TextInputForm from "./TextInputForm";

function TextInputFormContainer({ label, onValueChange }) {
  const [inputType, setInputType] = useState("password");
  const [value, setValue] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submitted", value);
    if (value) {
      onValueChange(value);
    }
  }

  function handleTextInputChange(event) {
    console.log("Text input changed");
    console.log(event.target.value);
    setValue(event.target.value);
  }

  function handleShowHideClick() {
    console.log("Show/Hide button clicked");
    setInputType(inputType === "password" ? "text" : "password");
  }

  const actualInputType = label === "Hint" ? "text" : inputType;

  return (
    <TextInputForm
      label={label}
      inputType={actualInputType}
      handleFormSubmit={handleFormSubmit}
      handleTextInputChange={handleTextInputChange}
      handleShowHideClick={handleShowHideClick}
      value={value}
    />
  );
}

export default TextInputFormContainer;