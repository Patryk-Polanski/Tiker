import { USER_USERNAME, USER_PASSWORD } from '../config';

let formEls = {};

const getElements = function (obj = {}) {
  obj.enterBtn = document.querySelector('.js-enter-btn');
  obj.joinBtn = document.querySelector('.js-join-btn');
  obj.usernameInput = document.querySelector('.js-login-username');
  obj.passwordInput = document.querySelector('.js-login-password');
  obj.loginMessage = document.querySelector('.js-form-message');
  return obj;
};

const clearLoginInputs = function () {
  formEls.usernameInput.value = '';
  formEls.passwordInput.value = '';
};

const compareLoginDetails = function (inputUsername, inputPassword) {
  if (inputUsername !== USER_USERNAME || inputPassword !== USER_PASSWORD) {
    formEls.loginMessage.textContent = 'Incorrect username and/or password';
    setTimeout(() => {
      formEls.loginMessage.textContent = '';
    }, 5000);
    return;
  }
  clearLoginInputs();
  window.location.href = '../../app.html';
};

export const addHandlerLogin = function () {
  formEls = getElements({});
  formEls.enterBtn.addEventListener('click', e => {
    e.preventDefault();
    const inputtedUsername = formEls.usernameInput.value;
    const inputtedPassword = formEls.passwordInput.value;
    compareLoginDetails(inputtedUsername, inputtedPassword);
  });
  formEls.joinBtn.addEventListener('click', e => {
    e.preventDefault();
    formEls.loginMessage.textContent = 'Join option is currently unavailable';
    setTimeout(() => {
      formEls.loginMessage.textContent = '';
    }, 5000);
  });
};
