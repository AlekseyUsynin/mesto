//Блоки
const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const elements = document.querySelector(".elements");
const element = document.querySelector(".element");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddProfile = document.querySelector(".popup_add-profile");
const popupViewImage = document.querySelector(".popup_view-image");
const popupFormAdd = popupAddProfile.querySelector(".popup__form");

//Кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEditClose = popupEditProfile.querySelector(".popup__button-close");
const popupAddClose = popupAddProfile.querySelector(".popup__button-close");
const popupViewImageClose = popupViewImage.querySelector(
  ".popup__button-close"
);

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

//массив для начальной загрузки карточек
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

//функция создания карточки
function addCard(name, link) {
  const elementTemplate = document.querySelector(".element-template").content;
  const card = elementTemplate.querySelector(".element").cloneNode(true);
  const elementDeleteButton = card.querySelector(".element__delete");
  const elementLike = card.querySelector(".element__like");
  const openImage = card.querySelector(".element__image");
  card.querySelector(".element__image").src = link;
  card.querySelector(".element__image").alt = name;
  card.querySelector(".element__title").textContent = name;
  elementDeleteButton.addEventListener("click", function (evt) {
    //удаляет карточку
    evt.target.closest(".element").remove();
  });
  elementLike.addEventListener("click", function () {
    //ставит и убирает лайк
    elementLike.classList.toggle("element__like_active");
  });
  openImage.addEventListener("click", function () {
    //открывает картинку
    openPopup(popupViewImage);
    popupImage.src = openImage.src;
    popupImage.alt = openImage.alt;
    popupCaption.textContent = openImage.alt;
  });
  return card;
}

//функция передающая текст из popup в header
function handleFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение submit
  profileTitle.textContent = popupInputName.value; //передаем в header текст имени из popup
  profileSubtitle.textContent = popupInputJob.value; //передаетм в header текс работы из popup
  popup.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
}

//функция добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault(); //отменяем стандартное поведение submit
  const card = addCard(popupAddInputTitle.value, popupAddInputLink.value);
  elements.prepend(card);
  closePopup(popupAddProfile);
  popupFormAdd.reset(); //очищает поля ввода
}

//функция открытие popup
function openPopup(popapName) {
  popapName.classList.add("popup_opened"); // добавляем клас открывающий popup
}

//функция закрытие popup
function closePopup(popupName) {
  popupName.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
}

//Добавляем карточки из массива initialCards
initialCards.forEach(function (elm) {
  const card = addCard(elm.name, elm.link);
  elements.append(card);
});

//открывает popup профиля
profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
});

profileAddButton.addEventListener("click", function () {
  openPopup(popupAddProfile);
});

popupEditClose.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

popupAddClose.addEventListener("click", function () {
  closePopup(popupAddProfile);
});

popupViewImageClose.addEventListener("click", function () {
  closePopup(popupViewImage);
});

popupForm.addEventListener("submit", handleFormSubmit);
popupFormAdd.addEventListener("submit", handleAddFormSubmit);
