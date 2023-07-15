import Popup from "./Popup.js";

// информация от родителя
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input");
    }

    getInputsValue() {
        this._values = {}; // пустой объект
        this._inputList.forEach(input => {
            this._values[input.name] = input.value;
        });
        console.log(this._values)
        return this._values;
    }

    setInputsValue(dataUser) {
        this._inputList.forEach(input => {
            input.value = dataUser[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners(); // от родителя
        this._form.addEventListener("submit", this._submitFunction);
    }

    close() {
        super.close();
        this._form.reset(); // reset формы при закрытии
    }
}
