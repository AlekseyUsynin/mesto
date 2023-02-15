import "./index.css";
import Popup from "../components/Popup";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import initialCards from "../utils/initialCards.js";
import {
  containerSelector,
  popupEditProfile,
  popupAddProfile,
  popupViewImage,
  popupFormEdit,
  popupFormAdd,
  profileEditButton,
  profileAddButton,
  popupInputName,
  popupInputJob,
  validationConfig,
} from "../utils/constants.js";

// функции ------------
//функция открывает попап с картинкой при клике на карточку
function handleCardClick(evt) {
  popupWithImage.open(evt.target);
}

//функеция при вызове которой создаёт карточку с текстом и ссылкой на изображение
function createElement(data) {
  const card = new Card(data, ".element-template", handleCardClick);
  const templateElement = card.getView();
  return templateElement;
}

// создание классов ------------
// класс Section отвечает за отрисовку элементов на странице.
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(createElement(item));
    },
  },
  containerSelector
);

//класс PopupWithImage перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
const popupWithImage = new PopupWithImage(popupViewImage);

//класс PopupWithForm собирает данные всех полей формы, добавляет обработчик клика и обработчик сабмита
const profileEditForm = new PopupWithForm(popupEditProfile, (data) => {
  userInfo.setUserInfo(data);
});

//класс PopupWithForm собирает данные всех полей формы, добавляет обработчик клика и обработчик сабмита
const addCardForm = new PopupWithForm(popupAddProfile, (item) => {
  section.addItem(createElement(item));
});

//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
  title: ".profile__title",
  info: ".profile__subtitle",
});

const validationFormAdd = new FormValidator(validationConfig, popupFormAdd);

const validationFormEditProfile = new FormValidator(
  validationConfig,
  popupFormEdit
);

// вызовы ------------
section.renderItems();
popupWithImage.setEventListeners();
profileEditForm.setEventListeners();
addCardForm.setEventListeners();
validationFormAdd.enableValidation();
validationFormEditProfile.enableValidation();

// cлушатели ------------
profileEditButton.addEventListener("click", function () {
  validationFormEditProfile.resetValidationForm(); //очистка ошибок, после открытия попапа.
  validationFormEditProfile.enableSubmitButton(); // валидация кнопки при открытии попапа.
  const { title, info } = userInfo.getUserInfo();
  popupInputName.value = title;
  popupInputJob.value = info;
  profileEditForm.open();
});

profileAddButton.addEventListener("click", function () {
  console.log("click");
  validationFormAdd.resetValidationForm(); //очистка ошибок, после открытия попапа.
  validationFormAdd.disableSubmitButton(); //отключает кнопку сохранить
  addCardForm.open();
});
