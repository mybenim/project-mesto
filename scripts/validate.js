// Валидация форм

// Функция показа ошибки. Передаем аргументы.
function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Получаем ошибку, которая привязана к инпуту

    inputElement.classList.add(inputErrorClass); // Добавляем класс инпуту, для подчеркивания нижней границы
    errorElement.textContent = errorMessage;     // Текст ошибки присваиваем аргументу функции errorMessage
    errorElement.classList.add(errorClass);      // Меняем класс у ошибки. Делаем ее видимой
}

// Функция скрытия ошибки
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass); // Удаляем класс у инпута, для удаления подчеркивания нижней границы
    errorElement.classList.remove(errorClass);      // Удаляем класс у ошибки. Делаем ее невидимой
    errorElement.textContent = "";                  // Делаем текст ошибки пустым
}

// Функция проверки валидности инпута
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        // Условие: если инпут НЕ валиден, то вызываем функцию показа ошибки с аргументами формы, инпута и сообщения ошибки инпута
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        // иначе, вызываем функцию скрытия ошибки с аргументами формы и инпута
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

// Функция проверки валидности всех инпутов
const inputList = document.querySelectorAll(".popup__input");
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

// Функция добавления/удаления класса кнопки
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
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

// все настройки передаются при вызове
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__safe",
    inactiveButtonClass: "popup__safe_disabled",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__input-error_active",
});

// Функция применения валидации
function enableValidation({ formSelector, ...rest }) {
    // Вводим массив всех форм
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    // Перебираем масив
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (event) {
            event.preventDefault();
        });
        // Функция обработчика каждого инпута
        setEventListeners(formElement, rest);
    });
}
