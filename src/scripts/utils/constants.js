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

const buttonPopupOpenProfile = document.querySelector(".profile__square");
const buttonPopupOpenAddCard = document.querySelector(".profile__rectangle");

const selectorTemplate = "#card-template";
const profilePopupSelector = "[data-popup-name=popup-profile]";
const addCardPopupSelector = "[data-popup-name=popup-card]";
const popupImageSelector = "[data-popup-name=popup-image]";
const popupAvatarSelector = "[data-popup-name=popup-avatar]";
const popupDeleteCardSelector = "[data-popup-name=popup-delete]";
const listsElementSelector = ".element__list";
const profileFormDataName = "form_profile";
const cardFormDataName = "form_card";
const profileAvatarFormDataName = "form_avatar";

const configInfo = {
  name: ".profile__title",
  job: ".profile__subtitle",
  profileAvatar: ".profile__avatar"
}

const formsValidator = {};

// Настройки enableValidation сохраняем в переменной
const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__safe",
    inactiveButtonClass: "popup__safe_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__input-error_active",
};

export {
  initialCards,
  buttonPopupOpenProfile,
  buttonPopupOpenAddCard,
  selectorTemplate,
  profilePopupSelector,
  addCardPopupSelector,
  popupImageSelector,
  popupAvatarSelector,
  popupDeleteCardSelector,
  listsElementSelector,
  configInfo,
  formsValidator,
  validationConfig,
  profileFormDataName,
  cardFormDataName,
  profileAvatarFormDataName
};
