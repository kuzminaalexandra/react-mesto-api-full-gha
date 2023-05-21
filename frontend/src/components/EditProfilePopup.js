import { PopupWithForm } from './PopupWithForm';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, close, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function nameChange(e) {
    setName(e.target.value);
  }
  function descriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      close={close}
      submitText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input popup__name'
        type='text'
        id='popup-profile-name'
        placeholder='Введите Ваше имя'
        minLength='2'
        maxLength='40'
        required
        onChange={nameChange}
        value={name || ''}
      />
      <span className='popup__error' id='popup-profile-name-error'></span>
      <input
        className='popup__input popup__profession'
        type='text'
        id='popup-profile-profession'
        placeholder='Введите Вашу профессию'
        minLength='2'
        maxLength='200'
        required
        onChange={descriptionChange}
        value={description || ''}
      />
      <span className='popup__error' id='popup-profile-profession-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
