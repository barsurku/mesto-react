import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";

export default function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="content">
      
      {/* <!-- профиль с кнопками --> */}
      <section className="profile">
      <button
          className="profile__avatar-button"
          onClick={props.onEditAvatar}
        ></button>
        <div
          className="profile__avatar"
          alt="Фото пользователя"
          style={{ backgroundImage: `url(${userAvatar})` }}
        />
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

     {/* отктрытие карточек */}
      <section className="elements">
        <ul className="elements__cards">
          {cards.map((cardData) => {
            return (
              <Card
                card={cardData}
                key={cardData._id}
                onClick={props.onCardClick}
              />
            );
          })}
        </ul>
      </section>

    </main>
  );
}