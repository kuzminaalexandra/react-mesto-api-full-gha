import React from 'react';
import logo from '../images/Logo.png';
import { Routes, Route, Link } from 'react-router-dom';

export function Header({ email, logout }) {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='логотип mesto Russia' />

      <div className='header__auth-container'>
        <div className='auth__header-email'>{email}</div>
        <Routes>
          <Route
            path='/sign-up'
            element={
              <Link className='auth__header-link' to='/sign-in'>
                Войти
              </Link>
            }
          ></Route>
          <Route
            path='/sign-in'
            element={
              <Link className='auth__header-link' to='/sign-up'>
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path='/'
            element={
              <Link className='auth__header-link' to='/sign-in' onClick={logout}>
                Выйти
              </Link>
            }
          ></Route>
          <Route
            path='/'
            element={
              <Link classname='auth__header-link' to='/sign-in'>
                Регистрация
              </Link>
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
}
