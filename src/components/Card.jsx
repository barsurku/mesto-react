import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${isLiked && "elements__like_active"}`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  };

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  };

  function handleClick() {
    props.onClick(props.card);
  };

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
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}>
          </button>

          <div className="elements__like_numbers">
            {props.card.likes.length}
          </div>
        </div>

        {isOwn && (
          <button
            className="elements__delete elements__delete_type_delete"
            type="button"
            onClick={handleDeleteClick}>
          </button>
        )}

      </div>
    </li>
  );
}