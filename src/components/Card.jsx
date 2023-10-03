import React from "react";

export default function Card(props) {
  function handleClick() {
    props.onClick(props.card);
  }

  return (
    <li className="elements__element">
      <div
        className="elements__element-photo"
        onClick={handleClick}
        style={{ backgroundImage: `url(${props.card.link})` }}
      />
      <div className="elements__element-info">
        <h2 className="elements__element-title">{props.card.name}</h2>
        <div className="elements__like_group">
          <button
            className="elements__like elements__like_type_like"
            type="button"
          ></button>
          <div className="elements__like_numbers">
            {props.card.likes.length}
          </div>
        </div>
        <button
          className="elements__delete elements__delete_type_delete"
          type="button" onClick={props.onDeleteCard}
        ></button>
      </div>
    </li>
  );
}