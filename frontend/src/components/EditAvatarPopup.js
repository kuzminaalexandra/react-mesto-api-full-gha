import { PopupWithForm } from './PopupWithForm';
import { useRef } from 'react';

function EditAvatarPopup({ isOpen, close, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      close={close}
      submitText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input popup__name avatar-link'
        id='popup-avatar-edit'
        type='url'
        placeholder='Ссылка на аватар'
        required
        ref={avatarRef}
      />
      <span className='popup__error' id='popup-avatar-edit-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
