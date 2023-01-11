//Блоки
const elements = document.querySelector(".elements");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddProfile = document.querySelector(".popup_add-profile");
const popupViewImage = document.querySelector(".popup_view-image");
const popupFormEdit = document.forms["popup-form-profile"];
const popupFormAdd = document.forms["popup-form-add"];

//Кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupButtonsClose = document.querySelectorAll(".popup__button-close");

//Поля для ввода
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputJob = document.querySelector(".popup__input_type_job");
const popupAddInputLink = popupFormAdd.querySelector(".popup__input_type_link");
const popupAddInputTitle = popupFormAdd.querySelector(
  ".popup__input_type_title"
);

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//функция создания карточки
function createCard(name, link) {
  const elementTemplate = document.querySelector(".element-template").content;
  const card = elementTemplate.querySelector(".element").cloneNode(true);
  const elementDeleteButton = card.querySelector(".element__delete");
  const elementLike = card.querySelector(".element__like");
  const openImage = card.querySelector(".element__image");
  openImage.src = link;
  openImage.alt = name;
  card.querySelector(".element__title").textContent = name;
  elementDeleteButton.addEventListener("click", deleteCard);

  //ставит и убирает лайк
  elementLike.addEventListener("click", function () {
    elementLike.classList.toggle("element__like_active");
  });
  //открывает картинку
  openImage.addEventListener("click", function () {
    popupImage.src = openImage.src;
    popupImage.alt = openImage.alt;
    popupCaption.textContent = openImage.alt;
    openPopup(popupViewImage);
  });
  return card;
}

//фуункция удаляет карточку
function deleteCard(evt) {
  evt.target.closest(".element").remove();
}

//функция передающая текст из popup в header
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение submit
  profileTitle.textContent = popupInputName.value; //передаем в header текст имени из popup
  profileSubtitle.textContent = popupInputJob.value; //передаетм в header текс работы из popup
  closePopup(popupEditProfile);
}

//функция добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение submit
  const card = createCard(popupAddInputTitle.value, popupAddInputLink.value);
  elements.prepend(card);
  closePopup(popupAddProfile);
  popupFormAdd.reset(); //очищает поля ввода
}

//функция открытие popup
function openPopup(popupName) {
  popupName.classList.add("popup_opened"); // добавляем клас открывающий popup
  document.addEventListener("keydown", closePopupEsc);
}

//функция закрытие popup
function closePopup(popupName) {
  popupName.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

//Добавляем карточки из массива initialCards
initialCards.forEach(function (elm) {
  const card = createCard(elm.name, elm.link);
  elements.append(card);
});

//открывает popup профиля
profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
  cleanError(popupFormEdit, validationConfig);
  enableSubmitButton(popupFormEdit, validationConfig);
});

profileAddButton.addEventListener("click", function () {
  openPopup(popupAddProfile);
  popupAddInputLink.value = "";
  popupAddInputTitle.value = "";
  cleanError(popupFormAdd, validationConfig);
  disableSubmitButton(popupFormAdd, validationConfig);
});

popupButtonsClose.forEach(function (button) {
  const popup = button.closest(".popup");
  popup.addEventListener("click", closePopupOverlay);
  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

popupFormEdit.addEventListener("submit", handleProfileFormSubmit);
popupFormAdd.addEventListener("submit", handleAddFormSubmit);
enableValidation(validationConfig); //передаем объект состоящий из свойств с классами, по каторым мы будет искать и в любую разметку эту валидацию могли применить
