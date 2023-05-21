import React from 'react';

export const PopupWithForm = ({ name, children, isOpen, close, title, submitText, onSubmit }) => {
  return (
    <section className={`popup popup-${name} ${isOpen ? 'popup__is-opened' : ''}`} onClick={close}>
      <div className='popup__container' onClick={(e) => e.stopPropagation()}>
        <button className='popup__button-close' onClick={close}></button>
        <form className={`popup__content popup-form-${name}`} onSubmit={onSubmit}>
          <h2 className='popup__title'>{title}</h2>
          {children}
          <button className='popup__button-save' type='submit'>
            {/* id='popup-submit-button' */}
            {submitText}
          </button>
        </form>
      </div>
    </section>
  );
};
