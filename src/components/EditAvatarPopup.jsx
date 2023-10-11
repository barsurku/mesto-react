import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  };

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}>
      <input
        ref={avatarRef}
        type="url"
        id="avatar"
        required
        className="popup__input popup__input_type_avatar"
        name="link"
        placeholder="Ссылка на аватар"
      />
      <span className="popup__input-error" id="error-avatar"></span>
    </PopupWithForm>
  );
}