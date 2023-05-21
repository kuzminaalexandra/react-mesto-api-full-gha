import React from 'react';
import { Card } from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onClickCard,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <div className='profile__container'>
          <div className='profile__bag'>
            <div className='profile__avatar-container' onClick={onEditAvatar}>
              <img className='profile__avatar' src={currentUser.avatar} alt='Аватар' />
            </div>

            <div className='profile__info'>
              <p className='profile__title'>{currentUser.name}</p>
              <button className='profile__edit-button' onClick={onEditProfile}></button>
              <p className='profile__subtitle'>{currentUser.about}</p>
            </div>
          </div>
        </div>
        <button className='profile__add-button' onClick={onAddPlace}></button>
      </section>

      <section className='elements'>
        <ul className='elements__container'>
          {cards.slice(0).reverse().map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onClickCard={onClickCard}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
