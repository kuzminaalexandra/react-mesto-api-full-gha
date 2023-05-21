import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoToolTip({ isOpen, close, error }) {
  return (
    <section
      className={`popup popup_infotooltip ${isOpen ? 'popup__is-opened' : ''}`}
      onClick={close}
    >
      <div className='popup__container' onClick={(e) => e.stopPropagation()}>
        <button className='popup__button-close' onClick={close}></button>
        <img className='popup__login-ico' src={!error ? success : fail} alt={error} />
        <p className='popup__login-title'>
          {!error ? 'Вы успешно зарегистрировались!' : 'Что то пошло не так! Попробуйте еще раз!'}
        </p>
      </div>
    </section>
  );
}

export default InfoToolTip;
