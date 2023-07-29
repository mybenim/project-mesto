export default class Card {
    constructor(cardData, selectorTemplate, openImagePopup, openDeletePopup, likeChange) {
        this._myId = cardData.myId;
        this._ownerId = cardData.owner._id;
        this._cardId = cardData._id;
        this._cardData = cardData;
        this._link = cardData.link;
        this._name = cardData.name;
        this._likes = cardData.likes;
        this._likeChange = likeChange;
        this._likesLength = cardData.likes.length;
        this._selectorTemplate = selectorTemplate;
        this._openImagePopup = openImagePopup;
        this._openDeletePopup = openDeletePopup;
        this._cloneElement = this._getTemplateClone();
        this._imageElement = this._cloneElement.querySelector(".card__item-img");
        this._likeIconElement = this._cloneElement.querySelector(".card__like-icon");
        this._basketIconElement = this._cloneElement.querySelector(".card__basket");
        this._cardTitle = this._cloneElement.querySelector(".card__title");
        this._counter = this._cloneElement.querySelector(".card__like-counter");
    }

    // Возвращаем разметку карточки
    _getTemplateClone() {
        return document.querySelector(this._selectorTemplate).content.querySelector(".card").cloneNode(true);
    }

    // Обработчик like
    _handleLike = () => {
      console.log('this._likeIconElement', this._likeIconElement)
        this._likeChange(this._likeIconElement, this._cardId);
    };

    _statusLikes() {
        this._likes.forEach(item => {
          if (item._id === this._myId) {
            this._likeIconElement.classList.add("card__button-like")
          }
        })
        this._counter.textContent = this._likesLength
    }

    toggleLike(likes) {
        this._likeIconElement.classList.toggle("card__button-like");
        this._counter.textContent = likes.length
    }

    // Обработчик basket
    _handlebasketDelete = () => {
        this._openDeletePopup(this, this._cardId);
    };

    _changeVisibleBasket() {
      if (this._myId === this._ownerId) {
          this._basketIconElement.style.display = "block";
        } else {
          this._basketIconElement.style.display = "none";
        }
    };

    _handleDeleteElement = () => {
        this._openDelete({element: this, cardId: this._cardId});
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

    // Метод удаления карточки
    removeCard() {
        this._cloneElement.remove();
        this._cloneElement = null;
    }

    createCard() {
        this._imageElement.src = this._link;
        this._imageElement.alt = `Изображение ${this._name}`;
        this._cardTitle.textContent = this._name;
        this._statusLikes();
        this._setEventListener();
        this._changeVisibleBasket();
        return this._cloneElement;
    }
}
