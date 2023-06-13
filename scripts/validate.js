// Валидация форм

// Функция ошибки. Передаем аргументы.
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

// Функция скрытия ошибки
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
}

// Функция проверки валидности инпута
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        // Условие: если инпут не валиден, то вызываем функцию показа ошибки с аргументами формы, инпута и сообщения ошибки инпута
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        // иначе, вызываем функцию скрытия ошибки с аргументами формы и инпута
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

// Функция проверки валидности всех инпутов
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

// Функция класса кнопки добавления/удаления
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

// Функция disabled кнопки
function disableSubmitButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
}

// Функция обработчик на каждый инпут формы
function setEventListeners(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
    // Получаем массив всех инпутов
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    // Перебор массива инпутов
    inputList.forEach((inputElement) => {
        // Обработчик на элемент массива
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass); // Функция проверки валидности инпута
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);           // Функцию смены класса кнопки
        });
    });
}

// Функция применения валидации
function enableValidation({ formSelector, createCardFormId, submitButtonSelector, inactiveButtonClass, ...rest }) {
    // Вводим массив всех форм
    const formList = Array.from(document.querySelectorAll(".popup__form"));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (event) {
            event.preventDefault();

            if (event.target.id === createCardFormId) {
                const buttonElement = formElement.querySelector(submitButtonSelector);

                disableSubmitButton(buttonElement, inactiveButtonClass);
            }
        });

        setEventListeners(formElement, { submitButtonSelector, inactiveButtonClass, ...rest });
    });
}

// все настройки enableValidation сохраняем в переменной
const validationConfig = {
    formSelector: ".popup__form",
    createCardFormId: "create-card-form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__safe",
    inactiveButtonClass: "popup__safe_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__input-error_active",
};

enableValidation(validationConfig);
