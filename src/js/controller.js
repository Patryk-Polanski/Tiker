import user from './helpers';

import { addHandlerKeypress } from './views/calculatorsView';

window.addEventListener('DOMContentLoaded', e => {
  console.log('DOM app is loaded');
  addHandlerKeypress();
});
