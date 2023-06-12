const listCard = document.querySelector(".element__list");
const nameTitleProfile = document.querySelector(".profile__title");
const JobProfile = document.querySelector(".profile__subtitle");
const popupOpenProfile = document.querySelector("[data-popup-name=popup-profile]");
const popupOpenAddNewCard = document.querySelector("[data-popup-name=popup-card]");
const popupOpenFullImage = document.querySelector("[data-popup-name=popup-image]");
const ImagePopupFullImage = document.querySelector(".popup__item-img");
const captionPopupFullImage = document.querySelector(".popup__caption");
const popupСontainer = document.querySelector(".popup__container");
const buttonPopupCloseList = document.querySelectorAll(".popup__close");
const buttonCreateCardSubmit = document.querySelector(".popup__create[type='submit']");
const inputFullNameProfile = document.querySelector(".popup__input_ctrl_fullname");
const inputjobProfile = document.querySelector(".popup__input_ctrl_job");
const inputLinkFormAddNewCard = document.querySelector(".popup__input_ctrl_link");
const inputNameFormAddNewCard = document.querySelector(".popup__input_ctrl_name");
const formNewAddCardSubmit = document.querySelector(".popup__form-card");
const formProfileSubmit = document.querySelector(".popup__form");


// Закрытие popup кнопкой Esc
function closeEsc(event) {
    // Если ключ кнопки равен Esc, то
    if (event.key === "Escape") {
      const popup = document.querySelector(".popup_opened");
      if (popup) {
         closePopup(popup); // закрываем
      }
    }
}

//Функция открытия модального окна
function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", closeEsc);
}

//Функция закрытия модального окна
function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeEsc);
}

// Получаем все оверлеи popup
const popupList = document.querySelectorAll(".popup");
const popupProfile = document.querySelector("[data-popup-name=popup-profile]");
const popupCard = document.querySelector("[data-popup-name=popup-card]");

// Перебираем оверлеи
popupList.forEach((popupListElement) => {
    // Получаем popup-родитель
    const popup = popupListElement.closest(".popup");
    // Обработчик
    popupListElement.addEventListener("mousedown", (event) => {
        if (event.target.classList.contains("popup")) {
            closePopup(popup);
        }
    });
});

function openPopupProfile() {
    inputFullNameProfile.value = nameTitleProfile.textContent;
    inputjobProfile.value = JobProfile.textContent;
    openPopup(popupOpenProfile);
}

function handleFormSubmitProfile() {
    nameTitleProfile.textContent = inputFullNameProfile.value;
    JobProfile.textContent = inputjobProfile.value;
    formProfileSubmit.reset();
    closePopup(popupOpenProfile);
}

// Mассив кнопок закрытия
buttonPopupCloseList.forEach((closeButtonElement) => {
    const popup = closeButtonElement.closest(".popup");
    closeButtonElement.addEventListener("click", () => {
        closePopup(popup);
    });
});

//Функция для создания карточек
const cardTemplate = document.querySelector("#card-template").content;
function createCard(link, name) {
    const elementCard = cardTemplate.querySelector(".card").cloneNode(true);
    const elementToCard = elementCard.querySelector(".card__item-img");
    elementCard.querySelector(".card__title").textContent = name;
    elementToCard.src = link;
    elementToCard.alt = name;

    //Функция кнопка удалить
    elementCard.querySelector(".card__basket").addEventListener("click", () => {
        elementCard.remove();
    });

    //Функция кнопка like
    elementCard.querySelector(".card__like-icon").addEventListener("click", toggleLikeIcon);
    function toggleLikeIcon(event) {
        event.target.classList.toggle("card__button-like");
    }

    //Функция открытия попапа с картинкой
    elementCard.querySelector(".card__item-img").addEventListener("click", () => {
        openPopup(popupOpenFullImage);
        captionPopupFullImage.textContent = name;
        ImagePopupFullImage.src = link;
        ImagePopupFullImage.alt = name;
    });
    return elementToCard, elementCard;
}

//Функция массива с карточками
function addCardToPage() {
    initialCards.forEach((item) => {
        listCard.append(createCard(item.link, item.name));
    });
}
addCardToPage();

//Функция добавления карточек
function handleFormSubmitAddCard(inputLinkFormAddNewCard, inputNameFormAddNewCard) {
    listCard.prepend(createCard(inputLinkFormAddNewCard.value, inputNameFormAddNewCard.value));
}

// Popup
const buttonPopupOpenProfile = document.querySelector(".profile__square");
document.querySelector(".profile__square").addEventListener("click", () => {
    openPopup(popupOpenProfile);
});

//Popup Новое место
const buttonPopupOpenAddCard = document.querySelector(".profile__rectangle");
document.querySelector(".profile__rectangle").addEventListener("click", () => {
    openPopup(popupOpenAddNewCard);
    // Кнопка disabled при открытии popup для добавления карточек
    buttonCreateCardSubmit.setAttribute("disabled", true);
    buttonCreateCardSubmit.classList.add("popup__safe_disabled");
});

// Обработчик формы
formProfileSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmitProfile(inputFullNameProfile, inputjobProfile);
    formProfileSubmit.reset();
    closePopup(popupOpenProfile);
});

// Обработчик формы добавления карточки
formNewAddCardSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmitAddCard(inputLinkFormAddNewCard, inputNameFormAddNewCard);
    formNewAddCardSubmit.reset();
    closePopup(popupOpenAddNewCard);
});
