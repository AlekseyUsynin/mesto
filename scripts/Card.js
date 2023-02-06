import openImage from "./index.js";

class Card {
  constructor(data, templateElement, openImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
    this._openImage = openImage;
  }

  _getTemplate() {
    const card = document
      .querySelector(".element-template")
      .content.querySelector(".element")
      .cloneNode(true);

    return card;
  }

  //функция удаляет карточку и чистит память
  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  //функция меняющая стиль кнопки лайк
  _likeCard() {
    this._likeButton.classList.toggle("element__like_active");
  }

  //функция со слушателями
  _setEventListener() {
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });

    this._imagePopupElement.addEventListener("click", () => {
      this._openImage(this._name, this._link);
    });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._deleteButton = this._newCard.querySelector(".element__delete");
    this._likeButton = this._newCard.querySelector(".element__like");

    this._imagePopupElement = this._newCard.querySelector(".element__image");
    this._imagePopupElement.src = this._link;
    this._imagePopupElement.alt = this._name;

    this._titlePopupElement = this._newCard.querySelector(".element__title");
    this._titlePopupElement.textContent = this._name;

    // this._setData();
    this._setEventListener();

    return this._newCard;
  }
}

export default Card;
