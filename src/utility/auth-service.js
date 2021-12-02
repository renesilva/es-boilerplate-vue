import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// Obtener el usuario actual
const getCurrentUser = () => JSON.parse(localStorage.getItem('user') || '{}');

// Cerrar sesión
const logout = () => {
  localStorage.removeItem('user');
  history.push({ pathname: process.env.PUBLIC_URL + '/user/login' });
  window.location.reload();
};

export default {
  logout,
  getCurrentUser,
};
