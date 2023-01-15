import React from "react";

const InputTap = (props) => {
  var type = "";
  if (props.val === "X") {
    type = "fa-solid fa-xmark";
  }
  if (props.val === "O") {
    type = "fa-solid fa-o";
  }
  const onClickHandler = () => {
    if (props.val.length === 0) props.tapHandler(props.idx);
  };
  return (
    <div className="input-tap" onClick={onClickHandler}>
      <i className={type}></i>
    </div>
  );
};

export default InputTap;
