//функция показываект ошибку
function showInputError(formElement, inputElement, config) {
  //ищем span с ошибкой по id
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass); //передаем в span клас с ошибкой
  errorElement.textContent = inputElement.validationMessage; //передаем стандартный текст ошибки
  inputElement.classList.add(config.inputErrorClass); //передаем в input клас с ошибкой
}

//функция уберает ошибку
function hideInputError(formElement, inputElement, config) {
  //ищем span с ошибкой по id
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass); //удаляем в span клас с ошибкой
  errorElement.textContent = ""; //удаляем стандартный текст ошибки
  inputElement.classList.remove(config.inputErrorClass); //удаляем в input клас с ошибкой
}

//фцнкция проверяет инпуты на валидность
function checkInputValidity(formElement, inputElement, config) {
  //проверяем у инпутов в параметре ValidityState свойство valid на валидность инпута
  if (inputElement.validity.valid) {
    //если поле инпут валидно, передаем функцию которая прячет ошибку
    hideInputError(formElement, inputElement, config);
  } else {
    //если поле инпут НЕ валидно, передаем функцию которая показывает ошибку
    showInputError(formElement, inputElement, config);
  }
}

//функция находим все инпуты
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) => {
    //на каждый инпут вешаем обработчик событий который будет срабатывать и передавать функцию checkInputValidity каждый раз, когда мы вводим текст
    inputElement.addEventListener("input", () => {
      // передаем функцию где проверяем валидность полей инпут
      checkInputValidity(formElement, inputElement, config);
    });
  });
}

//функция находим все формы
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    // передаем функцию где находим все инпуты
    setEventListeners(formElement, config);
  });
}
