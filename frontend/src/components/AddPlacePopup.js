import { PopupWithForm } from './PopupWithForm';
import { useState } from 'react';

function AddPlacePopup({ isOpen, close, onAddPlace }) {
  const [cardDescription, setCardDescription] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleDescriptionChange(e) {
    setCardDescription(e.target.value);
  }

  function handleLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardDescription,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name='photo-card'
      title='Новое место'
      isOpen={isOpen}
      close={close}
      submitText='Создать'
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input popup__name'
        id='popup__photo-name'
        type='text'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
        onChange={handleDescriptionChange}
        value={cardDescription || ''}
      />
      <span className='popup__error' id='popup__photo-name-error'></span>
      <input
        className='popup__input popup__profession'
        id='popup__photo-link'
        type='url'
        placeholder='Ссылка на картинку'
        required
        onChange={handleLinkChange}
        value={cardLink || ''}
      />
      <span className='popup__error' id='popup__photo-link-error'></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
