// выборка DOM
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__square');

//popup
const openPopup = function() {
popupElement.classList.add('popup_is-opened');
};

const closePopup = function() {
popupElement.classList.remove('popup_is-opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


const popupTextNameElement = popupElement.querySelector ('.popup__input-container_ctrl_fullname');
const popupTextJobElement = popupElement.querySelector ('.popup__input-container_ctrl_job');
const profileTitleElement = document.querySelector ('.profile__title');
const profileSubtitleElement = document.querySelector ('.profile__subtitle');

  popupOpenButtonElement.addEventListener('click', () => {
  openPopup(popupOpenButtonElement);
  popupTextNameElement.value = profileTitleElement.textContent;
  popupTextJobElement.value = profileSubtitleElement.textContent;
});
 popupCloseButtonElement.addEventListener('submit', (event) => {
 event.preventDefault();
 profileTitleElement.textContent = popupTextNameElement.value;
 profileSubtitleElement.textContent = popupTextJobElement.value;
});

function handleFormSubmit (event) {
    event.preventDefault();

const formElement = document.getElementById('formElement');
const handleFormSubmit = document.getElementById('handleFormSubmit');
formElement.addEventListener('submit', handleFormSubmit);

closePopup();
}
