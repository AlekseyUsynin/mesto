//класс Card создаёт карточку с текстом и ссылкой на изображение

export default class Card {
  constructor(item, elementTemplate, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
  }

  //получаем разметку
  _getTemplate() {
    const card = document
      .querySelector(this._elementTemplate)
      .content.querySelector(".element")
      .cloneNode(true);

    return card;
  }

  //метод удаляет карточку и чистит память
  _deleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  //метод меняющая стиль кнопки лайк
  _likeCard() {
    this._likeButton.classList.toggle("element__like_active");
  }

  //метод со слушателями
  _setEventListener() {
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });

    this._imagePopupElement.addEventListener("click", () =>
      this._handleCardClick({ src: this._link, alt: this._name })
    );
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

    this._setEventListener();

    return this._newCard;
  }
}
