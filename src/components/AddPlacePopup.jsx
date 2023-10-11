import React from "react";
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: title,
      link: link,
    });
  }

  function titleChange(e) {
    setTitle(e.target.value);
  }

  function linkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"add-button"}
      title={"Новое место"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}>

      <input
        id="placeName"
        required
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_type_element-name"
        name="name"
        placeholder="Название"
        value={title}
        onChange={titleChange}
      />
      <span className="popup__input-error" id="error-placeName"></span>

      <input
        type="url"
        id="placeLink"
        required
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={linkChange}
      />
      <span className="popup__input-error" id="error-placeLink"></span>

    </PopupWithForm>
  );
}