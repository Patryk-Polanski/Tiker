import user from './helpers';

import { addHandlerLogin } from './views/loginView';

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM is loaded');
  addHandlerLogin();
});
