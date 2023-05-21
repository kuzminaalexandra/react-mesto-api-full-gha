import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthForm from './AuthForm';

function Login({ signin, loggedIn }) {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    signin(formValues.email, formValues.password);
  };

  useEffect(() => {
    setFormValues({ email: '', password: '' });
  }, []);

  if (loggedIn) {
    return <NavLink to='/' />;
  }

  return (
    <AuthForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      values={formValues}
      btnText='Войти'
      title='Вход'
    />
  );
}

export default Login;
