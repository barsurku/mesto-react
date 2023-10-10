import React from "react";

export default function PopupWithForm(props) {

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_open" : ""}`}>

      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />

        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          
          {props.children}
          <button
            type="submit"
            className="popup__submit"
          >{`${props.buttonText}`}</button>
        </form>
      </div>
    </div>
  );
}