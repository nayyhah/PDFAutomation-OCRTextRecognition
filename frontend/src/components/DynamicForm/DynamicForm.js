import React, { useState } from "react";

//import Dropdown from "../Dropdown/Dropdown";

import "./form.styles.css";
import Plus from "../../SVG/plus";
import Spinner from "../Spinner/Spinner";
// import { Checkmark } from "react-checkmark";
// import Failure from "../../SVG/failure";
import axios from "../../helpers/axios";

const DynamicForm = () => {
  const [fields, setFields] = useState([
    {
      id: "",
      email: "",
      role: "",
    },
  ]);
  console.log("fields", fields);

  const onClickButtonAdder = (event) => {
    event.preventDefault();
    setFields([...fields, { id: "", email: "", role: "" }]);
  };

  const onClickFormGroupButton = (index) => (event) => {
    event.preventDefault();
    let field = [...fields];
    field.splice(index, 1);
    setFields(field);
  };

  const onChangeFormGroupInput = (index) => (event) => {
    let field = [...fields];
    field[index].id = index;
    field[index].email = event.target.value;
    setFields(field);
  };

  // const onClickButtonSubmit = (event) => {
  //   event.preventDefault();
  //   const filteredValues = fields.filter((value) => value);
  //   console.log(filteredValues);
  // };

  // const sendInviteHandler = (index) => {
  //   console.log("fields", fields, index);
  //   console.log("field", fields[index]);
  //   sendInviteEmailAPI(index);
  // };

  const isFormGroupDeletionAllowed = fields.length > 1 ? true : false;

  return (
    <form className="dynamicForm">
      <div className="dynamicForm__buttonWrapper">
        <div className="flex items-center justify-between w-full">
          <FormButton
            click={onClickButtonAdder}
            type="ghost"
            innerHtml={
              <div className="flex items-center space-x-1">
                <span>Add Field</span>
                <Plus className="h-3.5 w-3.5 text-white" />
              </div>
            }
          />
          <div>
            <button
              type="submit"
              //onClick={() => setOpenAddUser(false)}
              className="mt-3 bg-blue-dark border border-blue-dark text-xs text-white font-semibold py-2 px-5 rounded-sm shadow-md mb-2"
            >
              Close
            </button>
          </div>
        </div>

        {/* <FormButton click={onClickButtonSubmit} innerHtml="Submit" /> */}
      </div>

      <div className="overflow-y-auto h-full pb-20 pt-5">
        {fields.map((value, index) => (
          <FormGroup
            inputChange={onChangeFormGroupInput(index)}
            buttonClick={onClickFormGroupButton(index)}
            buttonDisabled={
              index === 0 ? !isFormGroupDeletionAllowed : undefined
            }
            value={value?.email}
            key={index}
            fields={fields}
            setFields={setFields}
            index={index}
            //dashboardId={dashboardId}
            //isLoading={isLoading}
            //sendInviteHandler={sendInviteHandler}
          />
        ))}
      </div>
    </form>
  );
};

function FormButton(props) {
  let buttonType = props.type;
  let buttonModifierClassName = "";

  if (buttonType) {
    buttonType = `${buttonType[0].toUpperCase()}${buttonType.slice(1)}`; // capitalize
    buttonModifierClassName = `dynamicForm__button--is${buttonType}`;
  }

  return (
    <button
      className={`dynamicForm__button ${buttonModifierClassName}`}
      onClick={props.click}
    >
      {props.innerHtml}
    </button>
  );
}

function FormGroup(props) {
  const [isLoading, setIsLoading] = useState({ id: null });
  const [emailSent, setEmailSent] = useState({ id: null });
  const [error, setError] = useState({ id: null });
  console.log(
    "isLoading",
    isLoading,
    "error",
    error,
    "setEmailSent",
    emailSent
  );

  const sendInviteEmailAPI = async (position) => {
    try {
      setIsLoading({ id: position });
      const data = {
        dashboardId: props.dashboardId,
        email: props.fields[position].email,
        role: props.fields[position].role.toLowerCase(),
      };
      console.log("Data", data);

      const response = await axios.post(`/dashboard/sendInviteEmail`, data);
      console.log("Response", response);

      // const updatedCheckedState = checkedState.map((item, index) =>
      //   index === position ? !item : item
      // );
      setIsLoading({ id: null });
      setError({ id: null });
      setEmailSent({ id: position });
      //setCheckedState(updatedCheckedState);
    } catch (err) {
      setIsLoading({ id: position });
      setError({ id: position });
      setEmailSent({ id: null });
      //console.log(err);
      setIsLoading({ id: null });
    }
  };

  const sendInviteHandler = (index) => {
    if (props.fields[index].email !== "" && props.fields[index].role !== "") {
      sendInviteEmailAPI(index);
    } else {
      setError({ id: index });
    }
  };

  return (
    <div className="flex items-center space-x-5 px-5 my-2  w-full">
      <div className="dynamicForm__item">
        <input
          className="dynamicForm__itemInput"
          type="email"
          value={props.value}
          onChange={props.inputChange}
          placeholder="Email Address"
          id={props.index}
          name={props.index}
          disabled={emailSent.id === props.index}
        />
        <button
          className="dynamicForm__itemButton"
          type="button"
          onClick={props.buttonClick}
          disabled={props.buttonDisabled}
          tabIndex="-1"
        />
      </div>
      {/* <div>
        <Dropdown
          fields={props.fields}
          setFields={props.setFields}
          index={props.index}
        />
      </div> */}
      <div>
        <button
          disabled={
            isLoading.id === props.index || emailSent.id === props.index
          }
          onClick={(e) => {
            e.preventDefault();
            sendInviteHandler(props.index);
          }}
          type="submit"
          className="bg-blue-text active:bg-green-700 py-1.5 px-2 disabled:opacity-50 shadow-xl text-xs text-white flex items-center justify-center space-x-2 rounded-sm"
        >
          <span>Send Invite</span>
          {isLoading.id === props.index && (
            <span>
              <Spinner />
            </span>
          )}
        </button>
      </div>
      {/* <div> */}
      {/* <Check className="h-6 w-6 text-white bg-blue-text rounded-full p-1" /> */}

      {/* {isLoading.id === null &&
          emailSent.id === props.index &&
          error.id === null && (
            <div className="h-10 w-10 flex items-center justify-center">
              <Checkmark size="small" color="#00BFA5" />
            </div>
          )} */}
      {/* {isLoading.id === null &&
          emailSent.id === null &&
          error.id === props.index && (
            <div className="h-10 w-10 flex items-center justify-center">
              <Failure />
            </div>
          )}
      </div> */}

      {/* <Fail /> */}
    </div>
  );
}

export default DynamicForm;
