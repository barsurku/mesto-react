import Card from "./Card";

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      {/* <!-- профиль с кнопками --> */}
      <section className="profile">

        <button
          className="profile__avatar-button"
          onClick={props.onEditAvatar}>
        </button>

        <div
          className="profile__avatar"
          alt="Фото пользователя"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}/>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>

          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}>
          </button>

        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}>
        </button>

      </section>

      {/* отктрытие карточек */}
      <section className="elements">
        <ul className="elements__cards">
          {props.cards.map((cardData) => {
            return (
              
              <Card
                card={cardData}
                key={cardData._id}
                onClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />

            );
          })}
        </ul>
      </section>
    </main>
  );
}