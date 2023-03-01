import Popup from "./Popup.js";

//класс PopupWithImage перезаписывать родительский метод open.

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  //в методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
  open(name, link) {
    super.open();
    this._image.alt = name;
    this._image.src = link;
    this._caption.textContent = name;
  }
}
