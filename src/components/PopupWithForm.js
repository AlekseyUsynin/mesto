import Popup from "./Popup.js";

//класс PopupWithForm собирает данные всех полей формы, добавляет обработчик клика и обработчик сабмита

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(".popup__button-submit");
  }

  //метод _getInputValues собирает данные всех полей формы
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));

    return formValues;
  }

  //перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
  close() {
    super.close();
    this._popupForm.reset();
  }

  //меняем текст кнопки в момент загрузки
  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = "Сохранение";
    }
  }

  //метод setEventListeners наследует родительский метод, добавляет обработчик клика и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
