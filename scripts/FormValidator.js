class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._formList = Array.from(
      this._formElement.querySelectorAll(this._formSelector)
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  //функция показываект ошибку
  _showInputError(inputElement) {
    //ищем span с ошибкой по id, класс записан как id-error по этому мы можем его найти с применением шаблонных строк
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.add(this._errorClass); //передаем в span клас с ошибкой
    errorElement.textContent = inputElement.validationMessage; //передаем стандартный текст ошибки
    inputElement.classList.add(this._inputErrorClass); //передаем в input клас с ошибкой
  }

  //функция уберает ошибку
  _hideInputError(inputElement) {
    //ищем span с ошибкой по id, класс записан как id-error по этому мы можем его найти с применением шаблонных строк
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this._errorClass); //удаляем в span клас с ошибкой
    errorElement.textContent = ""; //удаляем стандартный текст ошибки
    inputElement.classList.remove(this._inputErrorClass); //удаляем в input клас с ошибкой
  }

  //фцнкция проверяет инпуты на валидность
  _checkInputValidity(inputElement) {
    //проверяем у инпутов в параметре ValidityState свойство valid на валидность инпута
    if (inputElement.validity.valid) {
      //если поле инпут валидно, передаем функцию которая прячет ошибку
      this._hideInputError(inputElement);
    } else {
      //если поле инпут НЕ валидно, передаем функцию которая показывает ошибку
      this._showInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    // метод some принимает колбэк функцию где для каждого инпута мы смотрим валитден он или нет, если все инпуты валидны даст trye, через "не" меняем на false и наоборот, что бы в дальнейшем в функции toggleButtonState, если поля не валидны, принимать trye и блокировать кнопку и на оборот
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  //функция блокирует кнопку сохранить, если не все инпуты валидны и разблокирует если все поля валидны
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  //функция находим все инпуты
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      //на каждый инпут вешаем обработчик событий который будет срабатывать и передавать функцию checkInputValidity каждый раз, когда мы вводим текст
      inputElement.addEventListener("input", () => {
        // передаем функцию где проверяем валидность полей инпут
        this._checkInputValidity(inputElement);
        //передаем функцию, которая проверяет валидность полей и включает или выключает кнопку сохранить
        this._toggleButtonState();
      });
    });
  }

  // //функция отключает кнопку Сохранить. Используется во внешнем коде, так как остается активной с пустыми полями, после повторного открытия попап добавления карточек, если в предыдущий раз форма прошла валитдацию
  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass); //добавляем клас блокирующий кнопку
    this._buttonElement.disabled = false; //включаем кнопку
  }

  //функция включает кнопку Сохранит. Используется во внешнем коде, так как оставалась неактивной с валидными полями, при первом открытии попап редактирования профиля
  enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass); //убираем класс блокирующий кнопку
    this._buttonElement.disabled = false; //включаем кнопку
  }

  //функцияф чистит ошибки в форме
  resetValidationForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //функция включает валидацию
  enableValidation = () => {
    this._setEventListeners();
  };
}
export default FormValidator;
