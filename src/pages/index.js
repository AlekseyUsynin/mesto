import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  popupFormEdit,
  popupFormAdd,
  popupFormAvatar,
  profileEditButton,
  profileAddButton,
  popupInputName,
  popupInputJob,
  popupInputAvatar,
  validationConfig,
  avatarEditButton,
} from "../utils/constants.js";

let userId = null; //переменная куда будет перезаписываться ID

// Создание новой карточки
function createElement(data) {
  const card = new Card(data, ".element-template", userId, {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleLikeClick: (id) => {
      card.checkUserLikes()
        ? api
            .deleteLike(id)
            .then((res) => {
              card.setLike(res.likes);
            })
            .catch((err) => console.log(err))
        : api
            .addLike(id)
            .then((res) => {
              card.setLike(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
    },
    handleDeleteClick: (id, card) => {
      deleteCardPopup.open(id, card);
    },
  });

  return card.getView();
}

// ------------ создание классов ------------

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "26c5076c-7af6-4200-9f3f-e51fcfc63afb",
    "Content-Type": "application/json",
  },
});

//создаем класс валитдации попап профиля
const validationFormEditProfile = new FormValidator(
  validationConfig,
  popupFormEdit
);

//создаем класс валитдации попап добавления карточек
const validationFormAdd = new FormValidator(validationConfig, popupFormAdd);

//создаем класс валитдации попап изменерия Аватарки
const validationFormAvatar = new FormValidator(
  validationConfig,
  popupFormAvatar
);

//класс PopupWithImage перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
const popupWithImage = new PopupWithImage(".popup_view-image");

//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  infoSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

// класс Section отвечает за отрисовку элементов на странице.
const section = new Section(
  {
    renderer: (items) => {
      section.addItems(createElement(items));
    },
  },
  ".elements"
);

//класс PopupWithForm собирает данные всех полей формы, добавляет обработчик клика и обработчик сабмита

//addCardForm добавляет карточки
const addCardForm = new PopupWithForm(".popup_add-profile", (data) => {
  addCardForm.loading(true);
  api
    .addCard(data)
    .then((data) => {
      section.addItem(createElement(data));
      addCardForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      addCardForm.loading(false);
    });
});

// попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithConfirmation(
  ".popup_type_delete-card",
  (id) => {
    deleteCardPopup.loading(true);
    api
      .deleteCard(id)
      .then(() => {
        deleteCardPopup.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally((reg) => {
        deleteCardPopup.loading(false);
      });
  }
);

//profileEditForm редактирует профиль
const profileEditForm = new PopupWithForm(".popup_edit-profile", (data) => {
  profileEditForm.loading(true);
  api
    .changeUserData(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      profileEditForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      profileEditForm.loading(false);
    });
});

//editAvatarPopup редактирует аватарку
const editAvatarPopup = new PopupWithForm(".popup_type_avatar", () => {
  editAvatarPopup.loading(true);
  api
    .changeUserAvatar(popupInputAvatar.value)
    .then((data) => {
      userInfo.setUserInfo(data);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      editAvatarPopup.loading(false);
    });
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userInfo.setUserInfo(data);
    userId = data._id;
    renderInitialCards(items);
  })
  .catch((err) => {
    console.log(err);
  });

const renderInitialCards = (items) => {
  section.renderItems(items);
};

// ------------ вызовы ------------
validationFormEditProfile.enableValidation();
validationFormAdd.enableValidation();
validationFormAvatar.enableValidation();
popupWithImage.setEventListeners();
profileEditForm.setEventListeners();
addCardForm.setEventListeners();
editAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();

function profileEditOpen() {
  validationFormEditProfile.resetValidationForm(); //очистка ошибок, после открытия попапа.
  validationFormEditProfile.enableSubmitButton(); // валидация кнопки при открытии попапа.
  const { titleSelector, infoSelector } = userInfo.getUserInfo();
  popupInputName.value = titleSelector;
  popupInputJob.value = infoSelector;
  profileEditForm.open();
}

function profileAddOpen() {
  validationFormAdd.resetValidationForm(); //очистка ошибок, после открытия попапа.
  validationFormAdd.disableSubmitButton(); //отключает кнопку сохранить
  addCardForm.open();
}

function avatarEditOpen() {
  validationFormAvatar.resetValidationForm(); //очистка ошибок, после открытия попапа.
  validationFormAvatar.disableSubmitButton(); //отключает кнопку сохранить
  editAvatarPopup.open();
}

// ------------ cлушатели ------------
profileEditButton.addEventListener("click", profileEditOpen);
profileAddButton.addEventListener("click", profileAddOpen);
avatarEditButton.addEventListener("click", avatarEditOpen);
