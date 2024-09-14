import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";

function TextInputForm({ inputType, handleFormSubmit, handleTextInputChange, handleShowHideClick ,label}) {
   
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <TextInput 
                    type={inputType}
                    // label={label}
                    placeholder="Enter a word or phrase here ..."
                    onChangeHandler={handleTextInputChange}
                />
            </div>

            <div className="flex gap-2 mt-1">
                <Button
                    styleType="warning"
                    text={inputType === "password" ? "Show" : "Hide"}
                    onClickHandler={handleShowHideClick}
                />
         
                <Button
                    type="submit"
                    styleType="primary"
                    text="Submit"
                />
            </div>
        </form>
    );
}

export default TextInputForm;