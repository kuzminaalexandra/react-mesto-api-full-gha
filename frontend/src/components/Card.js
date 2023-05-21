import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';

export const Card = ({ card, onClickCard, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${isLiked && 'elements__like-active'}`;

  function handleClickCard() {
    onClickCard(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <figure className='elements__photo'>
      {isOwn && <button className='elements__delete' onClick={handleDeleteClick} />}
      <img
        className='elements__photo-card'
        src={card.link}
        alt={card.name}
        onClick={handleClickCard}
      />
      <figcaption className='elements__text'>
        <p className='elements__paragraph'>{card.name}</p>
        <div className='elements__like-container'>
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className='elements__like-count'>{card.likes.length}</span>
        </div>
      </figcaption>
    </figure>
  );
};
