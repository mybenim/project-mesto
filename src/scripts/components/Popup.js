export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonPopupClose = this._popup.querySelector(".popup__close");
    }

    // обработчик Esc
    _handleCloseEsc = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    };

    //  методы со стилями для открытия/закрытия popup
    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleCloseEsc);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleCloseEsc);
    }

     // обработчик кнопке Close
    _handleCloseButton = () => {
            this.close();
    };

    // слушатель клика по кнопке Close and Overlay
    setEventListeners() {
        this._buttonPopupClose.addEventListener("click", this._handleCloseButton);
        this._popup.addEventListener("click", this._handlePopup);
    }

    // обработчик закрытия по Overlay
    _handlePopup = (event) => {
        if (event.target.classList.contains("popup")) {
            this.close();
        }
    };
}
