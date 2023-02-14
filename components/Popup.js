//класс Popup отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  //метод _handleEscClose содержит логику закрытия попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //метод setEventListeners добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__button-close")
      ) {
        this.close();
      }
    });
  }
}
