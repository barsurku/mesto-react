import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { useEffect } from "react";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard
  const [deleteMyCard, setDeleteMyCard] = React.useState() //card deleting


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cardData]) => {
        setCurrentUser(user);
        setCards(cardData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // функция лайка и дизлайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .removeCardLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  // удаление карточки с подтверждением
  const handleCardDelete = (event) => {
    event.preventDefault();

    setIsLoading(true);
    api.deleteMyCard(deleteMyCard._id).then(() =>
      api
        .getInitialCards()
        .then((item) => {
          setCards(item);
        })
        .then(() => closeAllPopups())
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false))
    );
  };

  // функция изменения профиля
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false))
  };

  // функция изменения аватара
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .changeProfileAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false))
  };

  // функция добавления новой карточки
  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false))
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setDeleteCardPopupOpen(true);
    setDeleteMyCard(card);
};

  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeleteCardPopupOpen(false);
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
        />
        <Footer />
      </div>

      {/* <!-- попап редактирования профиля --> */}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      {/* <!--попап изменения аватарки--> */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      {/* <!-- попап добавления карточки --> */}
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      {/* <!-- попап карточки --> */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      {/* <!-- попап подтверждения удаления карточки --> */}
      <PopupWithForm
        name={"confirm-delete"}
        title={"Вы уверены?"}
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        buttonText={isLoading? 'Удаление...' : 'Да'}
        isLoading={isLoading}
        onSubmit={handleCardDelete}
        card={deleteMyCard}
      />

    </CurrentUserContext.Provider>
  );
}