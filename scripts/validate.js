//функция показываект ошибку
function showInputError(formElement, inputElement, config) {
  //ищем span с ошибкой по id, класс записан как id-error по этому мы можем его найти с применением шаблонных строк
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass); //передаем в span клас с ошибкой
  errorElement.textContent = inputElement.validationMessage; //передаем стандартный текст ошибки
  inputElement.classList.add(config.inputErrorClass); //передаем в input клас с ошибкой
}

//функция уберает ошибку
function hideInputError(formElement, inputElement, config) {
  //ищем span с ошибкой по id, класс записан как id-error по этому мы можем его найти с применением шаблонных строк
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass); //удаляем в span клас с ошибкой
  errorElement.textContent = ""; //удаляем стандартный текст ошибки
  inputElement.classList.remove(config.inputErrorClass); //удаляем в input клас с ошибкой
}

// функция отчищает ошибку при открытии попап, передаем в отбработчик открытия попап
function cleanError(formElement, config) {
  const errorElement = Array.from(
    formElement.querySelectorAll(`.${config.errorClass}`)
  );
  errorElement.forEach((textErrer) => {
    textErrer.textContent = "";
  });
  const inputElement = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputElement.forEach((typeError) => {
    typeError.classList.remove(config.inputErrorClass);
  });
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

//функция проходит по всем инпутам и должно выявить их валидность, если валидлно, возвращает - false, если не валидно - trye
function hasInvalidInput(inputList) {
  // метод some принимает колбэк функцию где для каждого инпута мы смотрим валитден он или нет, если все инпуты валидны даст trye, через "не" меняем на false и наоборот, что бы в дальнейшем в функции toggleButtonState, если поля не валидны, принимать trye и блокировать кнопку и на оборот
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

//функция блокирует кнопку сохранить, если не все инпуты валидны и разблокирует если все поля валидны
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    //если есть невалидный инпут, добавляет класс блокирующший кнопку
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true; //включаем кнопку
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false; //выключаем кнопку
  }
}

//функция находим все инпуты
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  //отключаем кнопку при первом входе в попап
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    //на каждый инпут вешаем обработчик событий который будет срабатывать и передавать функцию checkInputValidity каждый раз, когда мы вводим текст
    inputElement.addEventListener("input", () => {
      // передаем функцию где проверяем валидность полей инпут
      checkInputValidity(formElement, inputElement, config);
      //передаем функцию, которая проверяет валидность полей и включает или выключает кнопку сохранить
      toggleButtonState(inputList, buttonElement, config);
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

//функция фиксит баг кнопки Сохранить, которая оставалась активной с пустыми полями, после повторного открытия попап, если в предыдущий раз форма прошла валитдацию
function disableSubmitButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.classList.add(config.inactiveButtonClass); //добавляем клас блокирующий кнопку
}

//функция фиксит баг кнопки Сохранить, которая оставалась неактивной с валидными полями, при первом открытии попап
function enableSubmitButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.classList.remove(config.inactiveButtonClass); //убираем класс блокирующий кнопку
  buttonElement.disabled = false; //включаем кнопку
}
