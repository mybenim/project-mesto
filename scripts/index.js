const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__square");
const popupSafeElement = popupElement.querySelector(".popup__safe")
const nameInput = popupElement.querySelector(".popup__input-container_ctrl_fullname");
const jobInput = popupElement.querySelector(".popup__input-container_ctrl_job");
const popupTitleElement = document.querySelector(".profile__title");
const popupJobElement = document.querySelector(".profile__subtitle");

const togglePopupVisibility = function () {
    popupElement.classList.add("popup__opened");
    nameInput.value = popupTitleElement.textContent;
    jobInput.value = popupJobElement.textContent;
};
popupOpenButtonElement.addEventListener("click", togglePopupVisibility);

const formElement = popupElement.querySelector(".popup__form");
formElement.addEventListener("submit", handleFormSubmit);

popupSafeElement.addEventListener("click", () => {
  popupElement.classList.remove("popup__opened");
});

function handleFormSubmit(event) {
    event.preventDefault();
    popupTitleElement.textContent = nameInput.value;
    popupJobElement.textContent = jobInput.value;
};

function closePopupVisibility() {
  popupElement.classList.remove("popup__opened");
}
popupCloseButtonElement.addEventListener("click", closePopupVisibility);
