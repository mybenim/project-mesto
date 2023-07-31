//import Popup from "./Popup.js";
import PopupWithSubmitBtn from "./PopupWithSubmitBtn.js";
export default class PopupWithForm extends PopupWithSubmitBtn {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input");
        this._submitBtn = this._form.querySelector(".popup__safe");
        this._submitBtn.textContent = this._submitBtn.textContent;
    }

    getInputsValue() {
        this._values = {}; // пустой объект
        this._inputList.forEach(input => {
            this._values[input.name] = input.value;
        });
        return this._values;
    }

    setInputsValue(dataUser) {
        this._inputList.forEach(input => {
            input.value = dataUser[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners(); // от родителя
        this._form.addEventListener("submit", (event) => {
        event.preventDefault();
        this._submitBtn.textContent = `${this._submitBtn.textContent}...`
        this._submitFunction(this.getInputsValue())
        this.close()
      });
    }

    close() {
        super.close();
        this._form.reset(); // reset формы при закрытии
    }
}
