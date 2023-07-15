import Popup from "./Popup.js";

// информация от родителя
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector(".popup__item-img");
        this._imagePopupCaption = this._popup.querySelector(".popup__caption");
    }

    open = (cardData) => {
        console.log(cardData);
        this._popupImage.src = cardData.link;
        this._popupImage.alt = `Изображение ${cardData.name}`;
        this._imagePopupCaption.textContent = cardData.name;
        super.open();
    };
}
