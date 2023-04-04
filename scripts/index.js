const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__square");

const togglePopupVisibility = function () {
    popupElement.classList.toggle("popup_opened");
};
popupOpenButtonElement.addEventListener("click", togglePopupVisibility);

const closePopupVisibility = function () {
    popupElement.classList.remove("popup_opened");
};
popupCloseButtonElement.addEventListener("click", closePopupVisibility);

const nameInput = popupElement.querySelector(".popup__input-container");
const jobInput = popupElement.querySelector(".popup__input-container");
const popupTitleElement = document.querySelector(".profile__title");
const popupJobElement = document.querySelector(".profile__subtitle");

const formElement = popupElement.querySelector(".popup__form");
formElement.addEventListener("submit", handleFormSubmit);


function handleFormSubmit(event) {
    event.preventDefault();
    nameInput.textContent = popupElement.querySelector(".popup__input-container").value;
    jobInput.textContent = popupElement.querySelector(".popup__input-container").value;
    popupTitleElement.value = document.querySelector(".profile__title").textContent;
    popupJobElement.value = document.querySelector(".profile__subtitle").textContent;
};
     /* :(  */
