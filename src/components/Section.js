// класс Section отвечает за отрисовку элементов на странице.

export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items; //массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); //селектор контейнера
  }

  //вставляем карточку
  addItem(item) {
    this._container.prepend(item);
  }

  //вставляем карточки с сервера
  addItems(items) {
    this._container.append(items);
  }

  //метод отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach(this._renderer);
  }
}
