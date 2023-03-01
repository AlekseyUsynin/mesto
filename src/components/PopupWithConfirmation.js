import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteClick) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__button-submit");
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleDeleteClick = handleDeleteClick;
  }

  //перезаписываем метод open, передаем карточку и ее id
  open(id, card) {
    super.open();
    this._id = id;
    this._card = card;
  }

  //удалить карточку со страницы
  deleteCard() {
    this._card.remove();
  }

  //меняем текст кнопки в момент загрузки
  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Удаление...";
    } else {
      this._submitButton.textContent = "Да";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteClick(this._id, this._card);
    });
  }
}
