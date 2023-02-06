import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./initialCards.js";

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

//функция добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение submit
  const card = {
    name: popupAddInputTitle.value,
    link: popupAddInputLink.value,
  };
  elements.prepend(createElement(card));
  closePopup(popupAddProfile);
  popupFormAdd.reset(); //очищает поля ввода
}

function createElement(data) {
  const card = new Card(data, ".element-template", openImage);
  const templateElement = card.getView();
  return templateElement;
}

//функция передающая текст из popup в header
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение submit
  profileTitle.textContent = popupInputName.value; //передаем в header текст имени из popup
  profileSubtitle.textContent = popupInputJob.value; //передаетм в header текс работы из popup
  closePopup(popupEditProfile);
}

function openImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupViewImage);
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

//открывает popup профиля
profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
  validationFormEditProfile.resetValidationForm();
  validationFormEditProfile.enableSubmitButton();
});

profileAddButton.addEventListener("click", function () {
  openPopup(popupAddProfile);
  popupAddInputLink.value = "";
  popupAddInputTitle.value = "";
  validationFormAdd.resetValidationForm();
  validationFormAdd.disableSubmitButton();
});

popupButtonsClose.forEach(function (button) {
  const popup = button.closest(".popup");
  popup.addEventListener("click", closePopupOverlay);
  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

//Добавляем карточки из массива initialCards
initialCards.forEach(function (elm) {
  elements.append(createElement(elm));
});

popupFormEdit.addEventListener("submit", handleProfileFormSubmit);
popupFormAdd.addEventListener("submit", handleAddFormSubmit);
const validationFormAdd = new FormValidator(validationConfig, popupFormAdd);
validationFormAdd.enableValidation();

const validationFormEditProfile = new FormValidator(
  validationConfig,
  popupFormEdit
);
validationFormEditProfile.enableValidation();
