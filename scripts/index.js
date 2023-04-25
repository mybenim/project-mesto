const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__square");
const nameInput = popupElement.querySelector(".popup__input-container_ctrl_fullname");
const jobInput = popupElement.querySelector(".popup__input-container_ctrl_job");
const popupTitleElement = document.querySelector(".profile__title");
const popupJobElement = document.querySelector(".profile__subtitle");

const togglePopupVisibility = function () {
    popupElement.classList.add("popup_opened");
    nameInput.value = popupTitleElement.textContent;
    jobInput.value = popupJobElement.textContent;
};
popupOpenButtonElement.addEventListener("click", togglePopupVisibility);

const formElement = popupElement.querySelector(".popup__form");
formElement.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    popupTitleElement.textContent = nameInput.value;
    popupJobElement.textContent = jobInput.value;

    const closePopupVisibility = function () {
        popupElement.classList.remove("popup_opened");
    };
    popupCloseButtonElement.addEventListener("click", closePopupVisibility);

    const popupSafeElement = function () {
        popupElement.classList.remove("popup_opened");
    };
    popupElement.addEventListener("click", popupSafeElement);
};



