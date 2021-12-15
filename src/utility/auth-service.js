import { createBrowserHistory } from 'history';
import { storageDelete } from './storage';

const history = createBrowserHistory();

// Obtener el usuario actual
export const getCurrentUser = () => JSON.parse(localStorage.getItem('user') || '{}');

// Cerrar sesión
export const logout = () => {
  storageDelete('user');
  history.push({ pathname: process.env.PUBLIC_URL + '/user/login' });
  window.location.reload();
};

export default {
  logout,
  getCurrentUser,
};
