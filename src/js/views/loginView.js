let formEl = {};

const getElements = function (obj = {}) {
  obj.enterBtn = document.querySelector('.js-enter-btn');
  return obj;
};

export const addHandlerLogin = function () {
  formEl = getElements({});
  formEl.enterBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '../../app.html';
  });
};
