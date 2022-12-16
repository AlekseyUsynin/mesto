const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupButtonClose = document.querySelectorAll(".popup__button-close");
let popup = document.querySelector(".popup");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddProfile = document.querySelector(".popup_add-profile");
const popupContainer = document.querySelector(".popup__container");
const popupForm = document.querySelector(".popup__form");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputJob = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const elements = document.querySelector(".elements");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopupEdit() {
  //функция открывающая popup
  popupEditProfile.classList.add("popup_opened"); // добавляем клас открывающий popup
  popupInputName.value = profileTitle.textContent; //передаем в popup текст имени из header
  popupInputJob.value = profileSubtitle.textContent; //передаетм в popup текс работы из header
}

function openPopupAdd() {
  //функция открывающая popup
  popupAddProfile.classList.add("popup_opened"); // добавляем клас открывающий popup
  popupInputName.value = profileTitle.textContent; //передаем в popup текст имени из header
  popupInputJob.value = profileSubtitle.textContent; //передаетм в popup текс работы из header
}

function closePopup(item) {
  //функция закрывающая popup
  popupEditProfile.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
  popupAddProfile.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
  // item.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  //функция передающая текст из popup в header
  evt.preventDefault(); //отменяем стандартное поведение submit
  profileTitle.textContent = popupInputName.value; //передаем в header текст имени из popup
  profileSubtitle.textContent = popupInputJob.value; //передаетм в header текс работы из popup
  popupEditProfile.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
  popupAddProfile.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
}

function notSurface(event) {
  event.stopPropagation(); //отменяет всплытие
}

function addElement(cards) {
  cards.forEach(function (elem) {
    const elementTemplate = document.querySelector("#element-template").content;
    const element = elementTemplate.querySelector(".element").cloneNode(true);
    element.querySelector(".element__title").textContent = elem.name;
    element.querySelector(".element__image").src = elem.link;
    element.querySelector(".element__image").alt = elem.name;
    elements.append(element);
  });
}
let buttonClose;

addElement(initialCards);

popupContainer.addEventListener("click", notSurface);
popup.addEventListener("click", closePopup);
profileEditButton.addEventListener("click", openPopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);

// popupContainer.forEach(function (container) {
//   container.addEventListener("click", function () {
//     popup = container.closest(".popup__container");
//     console.log("sdsd");
//     notSurface;
//   });
// });

popupButtonClose.forEach(function (button) {
  button.addEventListener("click", function () {
    popup = button.closest(".popup");
    closePopup(popup);
  });
});

popupForm.addEventListener("submit", handleFormSubmit);
