//Класс UserInfo отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({ titleSelector, infoSelector, avatarSelector }) {
    this._title = document.querySelector(titleSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  //метод getUserInfo возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userInfo = {
      titleSelector: this._title.textContent,
      infoSelector: this._info.textContent,
    };
    return userInfo;
  }

  //метод setUserInfo принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._title.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
