import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import "./index.css";

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
  validationConfig,
  profileFormDataName,
  cardFormDataName
} from "../scripts/utils/constants.js";

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
  popupProfile.close();
});

// Экземпляр формы addCard
const popupAddCard = new PopupWithForm(addCardPopupSelector, (event) => {
  event.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputsValue()));
  popupAddCard.close();
});

// Валидация форм
console.log('document.forms', document.forms)
Array.from(document.forms).forEach(item => {
  const form = new FormValidator(validationConfig, item);
  const name = item.dataset.name;
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
    formsValidator[profileFormDataName].resetForm()
});

// Popup Новое место
buttonPopupOpenAddCard.addEventListener("click", () => {
    popupAddCard.open();
    formsValidator[cardFormDataName].resetForm()
});

 const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
 const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10
