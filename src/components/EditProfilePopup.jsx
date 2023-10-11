import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if ((currentUser.name, currentUser.about)) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function userNameChange(e) {
    setName(e.target.value);
  }

  function userDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"edit-button"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}>
      <input
        id="name"
        required
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_name"
        name="name"
        value={name}
        onChange={userNameChange}
      />

      <span className="popup__input-error" id="error-name"></span>
      <input
        id="about"
        required
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_type_info"
        name="about"
        value={description}
        onChange={userDescriptionChange}
      />

      <span className="popup__input-error" id="error-about"></span>
    </PopupWithForm>
  );
}