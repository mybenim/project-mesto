// Проверяем, что подключили
console.log('Привет мир');

// Делаем выборку DOM
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__square');
console.log(popupOpenButtonElement);

//popup
const openPopup = function() {
popupElement.classList.add('popup_is-opened');
console.log('Open popup clicked');
};

const closePopup = function() {
popupElement.classList.remove('popup_is-opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

const closePopupByClickOnOverlay = function(event) {
  console.log (event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);


//safe
const popupSafeElement = popupElement.querySelector('.popup__safe');
const popupTextNameElement = popupElement.querySelector ('.popup__text-name');
const popupTextElement = popupElement.querySelector ('.popup__text');
const popupTitleElement = document.querySelector ('.profile__title');
const popupSubtitleElement = document.querySelector ('.profile__subtitle');


function handleFormSubmit (event) {
    event.preventDefault();

const popupTextNameElement = popupElement.querySelector ('.popup__text-name').value;
console.log(popupTextNameElement);

const popupTextElement = popupElement.querySelector ('.popup__text').value;
console.log(popupTextElement);

const popupTitleElement = document.querySelector ('.profile__title').textContent = popupTextNameElement;

const popupSubtitleElement = document.querySelector ('.profile__subtitle').textContent = popupTextElement;


formElement.addEventListener('submit', handleFormSubmit);

closePopup();
}
