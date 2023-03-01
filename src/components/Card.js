export default class Card {
  constructor(
    item,
    elementTemplate,
    userId,
    { handleCardClick, handleDeleteClick, handleLikeClick }
  ) {
    this._name = item.name;
    this._link = item.link;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = item.likes;
    this._cardId = item._id;
    this._userId = userId;
    this._isUserCard = userId === item.owner._id;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._elementTemplate)
      .content.querySelector(".element")
      .cloneNode(true);

    return card;
  }

  //метод удаляет карточку и чистит память
  deleteCard() {
    this._deleteButton.remove();
    this._deleteButton = null;
  }

  //метод меняющая стиль кнопки лайк
  _likeCard() {
    if (this.checkUserLikes()) {
      this._likeButton.classList.add("element__like_active");
    } else {
      this._likeButton.classList.remove("element__like_active");
    }
  }

  // устанавливаем лайк
  setLike(likesList) {
    this._likes = likesList;
    this._likesNumber.textContent = this._likes.length;
    this._likeCard();
  }

  // проверяем кто ставил лайк
  checkUserLikes() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _setListenersItems() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._cardId);
      this._likeCard();
    });
    this._imagePopupElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    if (!this._isUserCard) {
      this._deleteButton.remove();
      this._deleteButton = null;
    } else {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._cardId, this._newCard);
      });
    }
  }

  getView() {
    //
    this._newCard = this._getTemplate();
    this._deleteButton = this._newCard.querySelector(".element__delete");
    this._likeButton = this._newCard.querySelector(".element__like");

    this._imagePopupElement = this._newCard.querySelector(".element__image");
    this._imagePopupElement.src = this._link;
    this._imagePopupElement.alt = this._name;

    this._titlePopupElement = this._newCard.querySelector(".element__title");
    this._titlePopupElement.textContent = this._name;

    this._likesNumber = this._newCard.querySelector(".element__likes-number");
    this._likesNumber.textContent = this._likes.length;

    this.setLike(this._likes);
    this._setListenersItems();

    return this._newCard;
  }
}
