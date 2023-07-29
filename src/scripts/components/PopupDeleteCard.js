import PopupWithSubmitBtn from "./PopupWithSubmitBtn.js"
export default class PopupDeleteCard extends PopupWithSubmitBtn {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
    }

    setEventListeners() {
        super.setEventListeners(); // от родителя
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();

          console.log('popupDeleteCard submit this._element', this._element)
          console.log('popupDeleteCard submit this._cardId ', this._cardId )

            this._submitFunction({ element: this._element, cardId: this._cardId });
        });
    }

    open = (element, cardId) => {
        super.open(); // от родителя

      console.log('popupDeleteCard open element', element)
      console.log('popupDeleteCard open cardId', cardId)

        this._element = element; // создаём element
        this._cardId = cardId;
    };
}
