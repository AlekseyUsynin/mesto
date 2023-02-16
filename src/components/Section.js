// класс Section отвечает за отрисовку элементов на странице.

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items; //массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); //селектор контейнера
  }

  //метод addItem принимает DOM-элемент и добавляет его в контейнер
  addItem(templateElement) {
    this._container.prepend(templateElement);
  }

  //метод отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach(this._renderer);
  }
}
