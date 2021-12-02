import { api } from '@/config/site.config';
import { createBrowserHistory } from 'history';
import AuthService from './auth-service';

const history = createBrowserHistory();
// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getCurrentUser().token;
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (typeof response.data.status !== 'undefined') {
      if (response.data.status === 'Token is Expired') {
        // alert('Por favor inicia sesión de nuevo.')
        AuthService.logout();
      }
    }
    if (typeof response.data.success !== 'undefined' && response.data.message === 'No Autorizado') {
      // alert('Por favor inicia sesión de nuevo.')
      AuthService.logout();
    }
    return response;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        AuthService.logout();
        history.push({ pathname: process.env.PUBLIC_URL + '/user/login' });
        window.location.reload();
      } else if (err.response.status === 405 || err.response.status === 500) {
        // alert('Hubo un error con su pedido.')
      } else {
        // alert('Error de conexión, por favor trata de nuevo.')
      }
    } else {
      // alert('Error de conexión, por favor trata de nuevo.')
    }
    return Promise.reject(err);
  },
);
