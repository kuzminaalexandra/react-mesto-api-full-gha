import { useState } from 'react';
import validator from 'validator';

function AuthorizeForm({ onSubmit, onChange, btnText, values, title }) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    onChange(e);
    const email = e.target.value;
    if (!validator.isEmail(email)) {
      setEmailError('Неверный формат email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    onChange(e);
    const password = e.target.value;
    if (password.length < 6) {
      setPasswordError('Пароль должен содержать минимум 6 символов');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      onSubmit();
    }
  };

  return (
    <div className='auth__container'>
      <form className='auth__form' onSubmit={handleSubmit} noValidate>
        <h1 className='auth__title'>{title}</h1>
        <input
          className='auth__input'
          type='email'
          name='email'
          id='email'
          autoComplete='off'
          placeholder='E-mail'
          value={values.email}
          onChange={handleEmailChange}
        />
        {emailError && <p className='auth__error'>{emailError}</p>}
        <input
          className='auth__input'
          type='password'
          name='password'
          id='password'
          autoComplete='off'
          placeholder='Пароль'
          value={values.password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className='auth__error'>{passwordError}</p>}
        <button className='auth__btn'>{btnText}</button>
      </form>
    </div>
  );
}

export default AuthorizeForm;
