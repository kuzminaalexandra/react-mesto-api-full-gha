import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ signup, loggedIn }) {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    signup(formValues.email, formValues.password);
  };

  useEffect(() => {
    setFormValues({ email: '', password: '' });
  }, []);

  if (loggedIn) {
    return <NavLink to='/' />;
  }

  return (
    <>
      <AuthForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={formValues}
        btnText='Зарегистрироваться'
        title='Регистрация'
      />
      <p className='auth__link'>
        Уже зарегистрированы?
        <Link to='/sign-in' className='form__link'>
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
