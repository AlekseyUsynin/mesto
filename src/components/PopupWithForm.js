import Popup from "./Popup.js";

//класс PopupWithForm собирает данные всех полей формы, добавляет обработчик клика и обработчик сабмита

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  //метод _getInputValues собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._popupSelector
      .querySelectorAll(".popup__input")
      .forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  //перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
  close() {
    super.close();
    this._popupSelector.querySelector(".popup__form").reset();
  }

  //метод setEventListeners наследует родительский метод, добавляет обработчик клика и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
  }
}
