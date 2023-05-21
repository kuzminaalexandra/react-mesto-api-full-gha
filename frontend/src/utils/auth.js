export const BASE_URL = 'https://api.mesto-yap.nomoredomains.monster';
// export const BASE_URL = 'http://localhost:3000';

function handleRes(res) {
  if (!res.ok) {
    return res.json().then((message) => {
      if (message.error) {
        throw new Error(message.error);
      }
      if (message.message) {
        throw new Error(message.message);
      }
    });
  }
  return res.json();
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(handleRes);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(handleRes);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleRes);
};
