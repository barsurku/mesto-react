import React from "react";

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? "popup_open" : ""}`}>
      <figure className="popup__image-content">
        <button
          type="button"
          className=" popup__close popup__close-image"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__element-image"
          src={props.card ? props.card.link : ""} 
          alt={props.card ? props.card.name : ''} 
        />
        <figcaption className="popup__image-subtitle">
          {props.card ? props.card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}
