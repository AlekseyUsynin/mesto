const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupButtonClose = document.querySelector(".popup__button-close");
const popupContainer = document.querySelector(".popup__container");
const popupForm = document.querySelector(".popup__form");
const popupInputName = document.querySelector(".popup__input-name");
const popupInputJob = document.querySelector(".popup__input-job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

function openPopup() {
  //функция открывающая popup
  popup.classList.add("popup_opened"); // добавляем клас открывающий popup
  popupInputName.value = profileTitle.textContent; //передаем в popup текст имени из header
  popupInputJob.value = profileSubtitle.textContent; //передаетм в popup текс работы из header
}

function closePopup() {
  //функция закрывающая popup
  popup.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
}

function handleFormSubmit(evt) {
  //функция передающая текст из popup в header
  evt.preventDefault(); //отменяем стандартное поведение submit
  profileTitle.textContent = popupInputName.value; //передаем в header текст имени из popup
  profileSubtitle.textContent = popupInputJob.value; //передаетм в header текс работы из popup
  popup.classList.remove("popup_opened"); // удаляем класс что бы убрать popup
}

function notSurface(event) {
  event.stopPropagation(); //отменяет всплытие
}

popupContainer.addEventListener("click", notSurface);
popup.addEventListener("click", closePopup);
profileEditButton.addEventListener("click", openPopup);
popupButtonClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleFormSubmit);
