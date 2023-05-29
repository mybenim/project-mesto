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
const popupСontainer = document.querySelector(".popup__container");
const buttonPopupOpenProfile = document.querySelector(".profile__square");
const buttonPopupCloseList = document.querySelectorAll(".popup__close");
const buttonCreateCardSubmit = document.querySelector(".popup__create[type='submit']");
const inputFullNameProfile = document.querySelector(".popup__input-container_ctrl_fullname");
const inputjobProfile = document.querySelector(".popup__input-container_ctrl_job");
const inputLinkFormAddNewCard = document.querySelector(".popup__input-container_ctrl_link");
const inputNameFormAddNewCard = document.querySelector(".popup__input-container_ctrl_name");
const formNewAddCardSubmit = document.querySelector(".popup__form-card");
const formProfileSubmit = document.querySelector(".popup__form");


//Функция открытия модального окна
function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
}

//Функция закрытия модального окна
function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
}

function openPopupProfile() {
    inputFullNameProfile.value = nameTitleProfile.textContent;
    inputjobProfile.value = JobProfile.textContent;
    openPopup(popupOpenProfile);
}

function handleFormSubmitProfile(event) {
    event.preventDefault();
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
    elementCard.querySelector(".card__title").textContent = name;
    elementCard.querySelector(".card__item-img").src = link;
    elementCard.querySelector(".card__item-img").alt = name;

    //Функция кнопка удалить
    elementCard.querySelector(".card__basket").addEventListener("click", () => {
        elementCard.remove();
    });

    //Функция кнопка like
    elementCard.querySelector(".card__like-icon").addEventListener("click", toggleLikeIcon);
    function toggleLikeIcon(event) {event.target.classList.toggle("card__button-like");}

    //Функция открытия попапа с картинкой
    elementCard.querySelector(".card__item-img").addEventListener("click", () => {
        openPopup(popupOpenFullImage);
        captionPopupFullImage.textContent = name;
        ImagePopupFullImage.src = link;
        ImagePopupFullImage.alt = name;
    });
    return elementCard;
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
document.querySelector(".profile__square").addEventListener("click", () => {
    openPopup(popupOpenProfile);
});

//Popup Новое место
document.querySelector(".profile__rectangle").addEventListener("click", () => {
    openPopup(popupOpenAddNewCard);
});

// Обработчик формы добавления карточки
formNewAddCardSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFormSubmitAddCard(inputLinkFormAddNewCard, inputNameFormAddNewCard);
    formNewAddCardSubmit.reset();
    closePopup(popupOpenAddNewCard);
});

// Обработчик формы отправки
formProfileSubmit.addEventListener("submit", handleFormSubmitProfile);
