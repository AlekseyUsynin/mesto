const profileEditButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupButtonClose = document.querySelector(".popup__button-close");

const popupForm = document.querySelector(".popup__form");
const popupInputName = document.querySelector(".popup__input-name");
const popupInputJob = document.querySelector(".popup__input-job");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// открываем попап по кнопке
function openPopup() {
  popup.classList.add("popup_opened");
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
}

// закрываем попам по крестику
function closePopup() {
  popup.classList.remove("popup_opened");
}

// закрываем попап по клику на поле вне попап контейнера
popup.addEventListener("click", closePopup);
document
  .querySelector(".popup__container")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputJob.value;
  popup.classList.remove("popup_opened");
  console.log(profileSubtitle.value);
}

profileEditButton.addEventListener("click", openPopup);
popupButtonClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleFormSubmit);
