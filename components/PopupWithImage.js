import Popup from "./Popup.js";

//класс PopupWithImage перезаписывать родительский метод open.

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector(".popup__image");
    this._caption = this._popupSelector.querySelector(".popup__caption");
  }

  //в методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
  open(data) {
    super.open();
    this._image.alt = data.alt;
    this._image.src = data.src;
    this._caption.textContent = data.alt;
  }
}
