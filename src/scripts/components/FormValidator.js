export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._inputList = formElement.querySelectorAll(this._inputSelector);
    }

    _showInputError(errorElement, inputElement) {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError(errorElement, inputElement) {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    // Функция disabled кнопки
    _disableSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _hasInvalidInput() {
        return Array.from(this._inputList).some((inputElement) => !inputElement.validity.valid);
    }

    _toggleButtonState() {
        this._buttonElement = this._formElement.querySelector(".popup__safe");

        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add("popup__safe_disabled");
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove("popup__safe_disabled");
            this._buttonElement.disabled = false;
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            this._showInputError(errorElement, inputElement);
        } else {
            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            this._hideInputError(errorElement, inputElement);
        }
    }

    _setEventListener(inputSelector) {
        const inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListener(".popup__input");
    }

    resetErrorOpenForm() {
        this._inputList.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            if (!inputElement.validity.valid) {
                this._hideInputError(errorElement, inputElement);
            }
        });
        this._disableSubmitButton();
    }
}
