//Класс UserInfo отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({ title, info }) {
    this._title = document.querySelector(title);
    this._info = document.querySelector(info);
  }

  //метод getUserInfo возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userInfo = {
      title: this._title.textContent,
      info: this._info.textContent,
    };
    return userInfo;
  }

  //метод setUserInfo принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ title, info }) {
    this._title.textContent = title;
    this._info.textContent = info;
  }
}
