import React from 'react';

export const ImagePopup = ({ card, isOpen, close }) => {
  return (
    <div
      className={`popup popup_background_darker popup-photo-card-zoom ${
        isOpen ? 'popup__is-opened' : ''
      }`}
      onClick={close}
    >
      <div className='popup__photo-container' onClick={(e) => e.stopPropagation()}>
        <figure className='popup__photo-element'>
          <button className='popup__button-close' onClick={close}></button>
          <img className='popup__photo-item' src={card.link} alt={card.name} />
          <figcaption className='popup__photo-subtitle'>{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};
