import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Карточки
const initialCards = [
    {
        name: "Оранжевый амфиприон",
        link: "https://c.pxhere.com/photos/46/8b/anemone_fish_clown_fish_aquarium_amphiprion_fish_water_creature_swim_exotic-594057.jpg!d",
    },
    {
        name: "Аквариум",
        link: "https://c.pxhere.com/photos/f8/0d/fish_aquarium_sea_fish_tank_coral_reef_reef-981484.jpg!d",
    },
    {
        name: "Бычковая мандаринка",
        link: "https://c.pxhere.com/photos/42/c7/mandarin_cay_fish_sea_animal_under_water_aquarium_water-833712.jpg!d",
    },
    {
        name: "Тигровая акула",
        link: "https://c.pxhere.com/photos/eb/5f/shark_water_fish_blue_swimming-931716.jpg!d",
    },
    {
        name: "Монако",
        link: "https://c.pxhere.com/photos/72/ad/monaco_port_principality_of_monaco_yachts_boats_homes_skyscrapers_pushed-715101.jpg!d",
    },
    {
        name: "Морской пейзаж",
        link: "https://c.pxhere.com/photos/c8/43/bay_beach_seascape_paradise_nature_island_water_tropical-913469.jpg!d",
    },
];

const listCard = document.querySelector(".element__list");
const nameTitleProfile = document.querySelector(".profile__title");
const JobProfile = document.querySelector(".profile__subtitle");
const popupOpenProfile = document.querySelector("[data-popup-name=popup-profile]");
const popupOpenAddNewCard = document.querySelector("[data-popup-name=popup-card]");
const popupOpenFullImage = document.querySelector("[data-popup-name=popup-image]");
const ImagePopupFullImage = document.querySelector(".popup__item-img");
const captionPopupFullImage = document.querySelector(".popup__caption");
const buttonPopupOpenProfile = document.querySelector(".profile__square");
const buttonPopupOpenAddCard = document.querySelector(".profile__rectangle");
const buttonPopupCloseList = document.querySelectorAll(".popup__close");
const inputFullNameProfile = document.querySelector(".popup__input_ctrl_fullname");
const inputjobProfile = document.querySelector(".popup__input_ctrl_job");
const inputLinkFormAddNewCard = document.querySelector(".popup__input_ctrl_link");
const inputNameFormAddNewCard = document.querySelector(".popup__input_ctrl_name");
const formNewAddCardSubmit = document.querySelector(".popup__form-card");
const formProfileSubmit = document.querySelector(".popup__form");
const selectorTemplate = "#card-template";
const popupList = document.querySelectorAll(".popup");

// Настройки enableValidation сохраняем в переменной
const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__safe",
    inactiveButtonClass: "popup__safe_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__input-error_active",
};

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

// Popup Profile
buttonPopupOpenProfile.addEventListener("click", () => {
    openPopup(popupOpenProfile);
    formProfileElement.resetErrorOpenForm();
    inputFullNameProfile.value = nameTitleProfile.textContent;
    inputjobProfile.value = JobProfile.textContent;
});

// Popup Новое место
buttonPopupOpenAddCard.addEventListener("click", () => {
    openPopup(popupOpenAddNewCard);
    formNewAddCardSubmit.reset();
    formAddCardElement.resetErrorOpenForm();
});

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

//Функция открытия попапа с картинкой
function openImagePopup(cardData) {
    captionPopupFullImage.textContent = cardData.name;
    ImagePopupFullImage.src = cardData.link;
    ImagePopupFullImage.alt = cardData.name;
    openPopup(popupOpenFullImage);
}

//Функция для создания карточек
function createNewCard(element) {
    const card = new Card(element, selectorTemplate, openImagePopup);
    const cardElement = card.createCard();
    return cardElement;
}

//Функция массива с карточками
function addCard(container, card) {
    container.prepend(card);
}

initialCards.forEach((element) => {
    addCard(listCard, createNewCard(element));
});

// Валидация форм Profile
const formProfileElement = new FormValidator(validationConfig, formProfileSubmit);
formProfileElement.enableValidation();

// Валидация форм AddCard
const formAddCardElement = new FormValidator(validationConfig, formNewAddCardSubmit);
formAddCardElement.enableValidation();

// Обработчик формы редактирования
formProfileSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmitProfile(inputFullNameProfile, inputjobProfile);
    closePopup(popupOpenProfile);
});

// Обработчик формы добавления карточки
formNewAddCardSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    const cardDataNameUrl = { name: inputNameFormAddNewCard.value, link: inputLinkFormAddNewCard.value };
    addCard(listCard, createNewCard(cardDataNameUrl));
    //formNewAddCardSubmit.reset();
    closePopup(popupOpenAddNewCard);
});
