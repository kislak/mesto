export default class Section {
    constructor(container, renderer) {
        this._container = container;
        this._renderer = renderer;
    }

    render(items, userId) {
        items.forEach((item) => {
            this._renderer(item, userId)
        })
    }

    addItem(element) {
        this._container.append(element);
    }

    prependItem(element) {
      this._container.prepend(element);
    }

}
