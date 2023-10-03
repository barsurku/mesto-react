import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] =
  React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick() {
    setDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeleteCardPopupOpen(false);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeleteCard={handleDeleteClick}
        />
        <Footer />
      </div>

      {/* <!-- попап редактирования профиля --> */}
      <PopupWithForm
        name={"edit-button"}
        title={"Редактировать профиль"}
        buttonText={"Сохранить"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="name"
          required
          minLength="2"
          maxLength="40"
          className="popup__input popup__input_type_name"
          name="name"
        />
        <span className="popup__input-error" id="error-name"></span>
        <input
          id="about"
          required
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_type_info"
          name="about"
        />
        <span className="popup__input-error" id="error-about"></span>
      </PopupWithForm>

      {/* <!--попап изменения аватарки--> */}
      <PopupWithForm
        name={"avatar"}
        title={"Обновить аватар"}
        buttonText={"Сохранить"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          id="avatar"
          required
          className="popup__input popup__input_type_avatar"
          name="link"
          placeholder="Ссылка на аватар"
        />
        <span className="popup__input-error" id="error-avatar"></span>
      </PopupWithForm>

      {/* <!-- попап добавления карточки --> */}
      <PopupWithForm
        name={"add-button"}
        title={"Новое место"}
        buttonText={"Создать"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          id="placeName"
          required
          minLength="2"
          maxLength="30"
          className="popup__input popup__input_type_element-name"
          name="name"
          placeholder="Название"
        />
        <span className="popup__input-error" id="error-placeName"></span>
        <input
          type="url"
          id="placeLink"
          required
          className="popup__input popup__input_type_link"
          name="link"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error" id="error-placeLink"></span>
      </PopupWithForm>

      {/* <!-- попап карточки --> */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      {/* <!-- попап подтверждения удаления карточки --> */}
      <PopupWithForm
        name={"confirm-delete"}
        title={"Вы уверены?"}
        buttonText={"Да"} 
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
      >
      </PopupWithForm>
    </>
  );
}