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

const popupOpenButtonElement = document.querySelector(".profile__square");
const popupTitleElement = document.querySelector(".profile__title");
const popupJobElement = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input-container_ctrl_fullname");
const jobInput = document.querySelector(".popup__input-container_ctrl_job");
const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = document.querySelectorAll(".popup__close");
const imageCaptionPopup = document.querySelector(".popup__caption");
const picture = document.querySelector(".popup__item-img");
const popupNewLocation = document.querySelector(".popup__container-new");
const popupButtonCreate = popupNewLocation.querySelector(".popup__create");
const linkInput = popupNewLocation.querySelector(".popup__input-container_ctrl_link");
const newNameInput = popupNewLocation.querySelector(".popup__input-container_ctrl_name");
const sendNewForm = popupNewLocation.querySelector(".popup__form-new");
const formElement = popupElement.querySelector(".popup__form");
const newLocation = document.querySelector(".popup_type_location");
const imagePopup = document.querySelector(".popup_type_image");

// Popup   ---------------------
const togglePopupVisibility = function () {
    popupElement.classList.add("popup_opened");
    nameInput.value = popupTitleElement.textContent;
    jobInput.value = popupJobElement.textContent;
};
popupOpenButtonElement.addEventListener("click", togglePopupVisibility);

// Кнопка закрытия для popup
const closePopupVisibility = function () {
    popupElement.classList.remove("popup_opened");
};
popupCloseButtonElement.forEach((closeButtonElement) => {
    popup = closeButtonElement.closest(".popup");
    closeButtonElement.addEventListener("click", closePopupVisibility);
});

// Функция обработчик профиля
function handleFormSubmit(event) {
    event.preventDefault();
    popupTitleElement.textContent = nameInput.value;
    popupJobElement.textContent = jobInput.value;
    closePopupVisibility();
}

// Popup Новое место  ---------------------

function openPopup(popupToOpen) {
    popupToOpen.classList.add("popup_opened");
}
document.querySelector(".profile__rectangle").addEventListener("click", () => {
    openPopup(newLocation);
});

// Кнопка закрытия для popup Новое место
const closePopupNewVisibility = function () {
    newLocation.classList.remove("popup_opened");
};
popupCloseButtonElement.forEach((closeButtonElement) => {
    popup = closeButtonElement.closest(".popup");
    closeButtonElement.addEventListener("click", closePopupNewVisibility);
});

// Кнопка закрытия для popup с картинкой
const closePopupImageVisibility = function () {
    imagePopup.classList.remove("popup_opened");
};
popupCloseButtonElement.forEach((closeButtonElement) => {
    popup = closeButtonElement.closest(".popup");
    closeButtonElement.addEventListener("click", closePopupImageVisibility);
});

//Блок карточек
const listCard = document.querySelector(".element__list");

//Функция для создания карточек
const cardTemplate = document.querySelector("#card-template").content;
function createCard(link, name) {
    const itemElement = cardTemplate.querySelector(".card").cloneNode(true);
    itemElement.querySelector(".card__title").textContent = name;
    itemElement.querySelector(".card__item-img").src = link;
    itemElement.querySelector(".card__item-img").alt = name;

    //Функция кнопка удалить
    itemElement.querySelector(".card__basket").addEventListener("click", () => {
        itemElement.remove(".card");
    });

    //Функция кнопка like
    itemElement.querySelector(".card__like-icon").addEventListener("click", function (event) {
        event.target.classList.toggle("card__button-like");
    });

    //Функция открытия попапа с картинкой
    itemElement.querySelector(".card__item-img").addEventListener("click", () => {
        imagePopup.classList.toggle("popup_opened");
        imageCaptionPopup.textContent = name;
        picture.src = link;
        picture.alt = name;
    });
    return itemElement;
}

//Функция массива с карточками
function addCardToPage() {
    initialCards.forEach((item) => {
        listCard.append(createCard(item.link, item.name));
    });
}
addCardToPage();

//Функция добавления карточек
function addCard(linkInput, newNameInput) {
    listCard.prepend(createCard(linkInput.value, newNameInput.value));
}

// Обработчик на кнопку добавления карточки
popupButtonCreate.addEventListener("click", (event) => {
    event.preventDefault();
    addCard(linkInput, newNameInput);
});

popupButtonCreate.addEventListener("click", (event) => {
    event.preventDefault();
    newLocation.classList.toggle("popup_opened");
    linkInput.value = "";
    newNameInput.value = "";
});

//Обработчик отправки функции создания карточки
popupButtonCreate.addEventListener("submit", createCard);
formElement.addEventListener("submit", handleFormSubmit);
sendNewForm.addEventListener("submit", addCard);
