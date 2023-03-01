//Блоки
export const popupFormEdit = document.forms["popup-form-profile"];
export const popupFormAdd = document.forms["popup-form-add"];
export const popupFormAvatar = document.forms["popup-form-avatar"];
export const popupInputAvatar = document.querySelector(
  ".popup__input_type_avatar"
);

//Кнопки для слушателей
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const avatarEditButton = document.querySelector(".profile__edit-avatar");

//Поля для ввода
export const popupInputName = document.querySelector(".popup__input_type_name");
export const popupInputJob = document.querySelector(".popup__input_type_job");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
