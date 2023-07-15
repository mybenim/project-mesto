import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import "./pages/index.css";

import {
  initialCards,
  buttonPopupOpenProfile,
  buttonPopupOpenAddCard,
  selectorTemplate,
  profilePopupSelector,
  addCardPopupSelector,
  popupImageSelector,
  listsElementSelector,
  configInfo,
  formsValidator,
  validationConfig
} from "./scripts/utils/constants.js";

/*
const listCard = document.querySelector(".element__list");
const nameTitleProfile = document.querySelector(".profile__title");
const JobProfile = document.querySelector(".profile__subtitle");
const popupOpenProfile = document.querySelector("[data-popup-name=popup-profile]");
const popupOpenAddNewCard = document.querySelector("[data-popup-name=popup-card]");
const popupOpenFullImage = document.querySelector("[data-popup-name=popup-image]");
const ImagePopupFullImage = document.querySelector(".popup__item-img");
const captionPopupFullImage = document.querySelector(".popup__caption");
const buttonPopupCloseList = document.querySelectorAll(".popup__close");
const inputFullNameProfile = document.querySelector(".popup__input_ctrl_fullname");
const inputjobProfile = document.querySelector(".popup__input_ctrl_job");
const inputLinkFormAddNewCard = document.querySelector(".popup__input_ctrl_link");
const inputNameFormAddNewCard = document.querySelector(".popup__input_ctrl_name");
const formNewAddCardSubmit = document.querySelector(".popup__form-card");
const formProfileSubmit = document.querySelector(".popup__form");
*/

const userInfo = new UserInfo(configInfo);

const popupImage = new PopupWithImage(popupImageSelector);

const section = new Section({
  items: initialCards,
  renderer: (element) => {
  const card = new Card(element, selectorTemplate, popupImage.open);
  return card.createCard();
  }
}, listsElementSelector)

section.addCardArray()

// Экземпляр формы Profile
const popupProfile = new PopupWithForm(profilePopupSelector, (event) => {
  event.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputsValue());
  // кнопка safe disabled
  const submitButton = document.querySelector(profilePopupSelector).querySelector(".popup__safe");
  submitButton.disabled = true
  submitButton.classList.add("popup__safe_disabled");
  popupProfile.close();
});

// Экземпляр формы addCard
const popupAddCard = new PopupWithForm(addCardPopupSelector, (event) => {
  event.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputsValue()));
  // кнопка safe disabled
  const submitButton = document.querySelector(addCardPopupSelector).querySelector(".popup__safe");
  submitButton.disabled = true
  submitButton.classList.add("popup__safe_disabled");
  popupAddCard.close();
});

// Валидация форм
Array.from(document.forms).forEach(item => {
  const form = new FormValidator(validationConfig, item);
  const name = item.name;
  formsValidator[name] = form
  form.enableValidation()
});

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

// Popup Profile
  buttonPopupOpenProfile.addEventListener("click", () => {
    popupProfile.setInputsValue(userInfo.getUserInfo());
    popupProfile.open();
});

// Popup Новое место
buttonPopupOpenAddCard.addEventListener("click", () => {
    popupAddCard.open();
});

 //popup.resetErrorOpenForm();

 const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10
