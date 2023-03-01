// класс Section отвечает за отрисовку элементов на странице.

export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items; //массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector); //селектор контейнера
  }

  //метод addItem принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    // console.log(item);
    this._container.prepend(item);
  }

  //метод отвечает за отрисовку всех элементов
  renderItems(items) {
    items.reverse().forEach(this._renderer);
  }
}
