export default class Card {
    constructor(cardData, selectorTemplate, openImagePopup) {
        this._cardData = cardData;
        this._link = cardData.link;
        this._name = cardData.name;
        this._selectorTemplate = selectorTemplate;
        this._openImagePopup = openImagePopup;
    }

    // Возвращаем разметку карточки
    _getTemplateClone() {
        return document.querySelector(this._selectorTemplate).content.querySelector(".card").cloneNode(true);
    }

    // Обработчик like
    _handleLike = () => {
        this._likeIconElement.classList.toggle("card__button-like");
    };

    // Обработчик basket
    _handlebasketDelete = () => {
        this._cloneElement.remove();
        this._cloneElement = null;
    };

    // Обработчик откытия картинки
    _handleOpenImageInPopup = () => {
        this._openImagePopup(this._cardData);
    };

    // Приватный метод слушателей
    _setEventListener = () => {
        this._likeIconElement.addEventListener("click", this._handleLike);
        this._basketIconElement.addEventListener("click", this._handlebasketDelete);
        this._imageElement.addEventListener("click", this._handleOpenImageInPopup);
    };

    createCard() {
        this._cloneElement = this._getTemplateClone();
        this._imageElement = this._cloneElement.querySelector(".card__item-img");
        this._likeIconElement = this._cloneElement.querySelector(".card__like-icon");
        this._basketIconElement = this._cloneElement.querySelector(".card__basket");
        this._cardTitle = this._cloneElement.querySelector(".card__title");
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._setEventListener();
        return this._cloneElement;
    }
}
