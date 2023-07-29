export default class Section {
    constructor({ renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this.renderer = renderer;
    }

 addCardArray(cardList) {
        cardList.forEach(element => {
            this.renderer(element);
        });
    }

    addItemPrepend(elementDom) {
        this._container.prepend(elementDom);
    }

     addItemAppend(elementDom) {
        this._container.append(elementDom);
    }
}
