import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { ImagePopup } from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import '../index.css';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';

import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import InfoToolTip from './InfoToolTip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [toolTipPopup, setToolTipPopup] = useState({ isOpen: false, errorMessage: '' });
  const navigate = useNavigate();

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setToolTipPopup({
          errorMessage: '',
          isOpen: true,
        });
        navigate('/sign-in', { replace: true });
      })
      .catch((error) => setToolTipPopup({ isOpen: true, errorMessage: error.message }));
  }
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch((error) =>
        setToolTipPopup({
          isOpen: true,
          errorMessage: error.message,
        })
      );
  }

  function handleLogout() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          if (res) {
            setEmail(res.email);
          }
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setEmail('');
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((error) => console.log(error));
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleClickCard(data) {
    setImagePopupOpen(true);
    setSelectedCard(data);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setToolTipPopup(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .likeCounter(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(card) {
    api
      .deleteElement(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }
  function handleAvatarUpdate(data) {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }
  function onAddPlace(data) {
    api
      .generateCard(data)
      .then((newData) => {
        setCards([...cards, newData]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={email} logout={handleLogout} />

        <Routes>
          <Route path='/sign-in' element={<Login logged={loggedIn} signin={handleLogin} />}></Route>
          <Route
            path='/sign-up'
            element={<Register logged={loggedIn} signup={handleRegister} />}
          ></Route>
          <Route
            path='/'
            element={
              <ProtectedRoute
                path='/'
                element={Main}
                logged={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onClickCard={handleClickCard}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            }
          />
        </Routes>

        <Footer />

        <InfoToolTip
          isOpen={toolTipPopup.isOpen}
          close={closeAllPopups}
          error={toolTipPopup.errorMessage}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          close={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          close={closeAllPopups}
          onAddPlace={onAddPlace}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          close={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
        />
        <ImagePopup card={selectedCard} isOpen={imagePopupOpen} close={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
