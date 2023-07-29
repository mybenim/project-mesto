import Popup from "./Popup.js";
export default class PopupWithSubmitBtn extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitBtn = this._form.querySelector(".popup__safe");
    }

    toggleSubmitBtnText(text) {
      this._submitBtn.textContent = text
    }
}
