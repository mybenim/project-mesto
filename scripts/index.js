const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__square");

const togglePopupVisibility = function () {
    popupElement.classList.add("popup__opened");
    nameInput.textContent = nameInput.value="";
    jobInput.textContent = jobInput.value="";
    popupTitleElement.value = popupTitleElement.textContent;
    popupJobElement.value = popupJobElement.textContent;
};
popupOpenButtonElement.addEventListener("click", togglePopupVisibility);

function closePopupVisibility() {
  popupElement.classList.remove("popup__opened");
}
popupCloseButtonElement.addEventListener("click", closePopupVisibility);

const nameInput = popupElement.querySelector(".popup__input-container_ctrl_fullname");
const jobInput = popupElement.querySelector(".popup__input-container_ctrl_job");
const popupTitleElement = document.querySelector(".profile__title");
const popupJobElement = document.querySelector(".profile__subtitle");

const formElement = popupElement.querySelector(".popup__form");
formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    closePopup();
};
