import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupDeleteCard from "../scripts/components/PopupDeleteCard.js";
import Api from "../scripts/components/Api.js";
import "./index.css";

import {
  buttonPopupOpenProfile,
  buttonPopupOpenAddCard,
  selectorTemplate,
  profilePopupSelector,
  addCardPopupSelector,
  popupImageSelector,
  popupAvatarSelector,
  popupDeleteCardSelector,
  listsElementSelector,
  configInfo,
  formsValidator,
  validationConfig,
  profileFormDataName,
  profileAvatarFormDataName,
  cardFormDataName,
} from "../scripts/utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-71",
  headers: {
    authorization: "e164ebe0-cf4e-493a-bf1c-60f1f87f2b77",
    "Content-Type": "application/json"
  }
});

let myId = null
const userInfo = new UserInfo(configInfo);
const section = new Section({
  renderer: (element) => {
    section.addItemAppend(newCard(element))
  }
}, listsElementSelector)

// Экземпляр форм Popup
const popupImage = new PopupWithImage(popupImageSelector);
const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector, ({ element, cardId }) => {
  console.log('popupDeleteCard element', element)
  console.log('popupDeleteCard cardId', cardId)

    popupDeleteCard.toggleSubmitBtnText("Удаление...")

    api.deleteCard(cardId)
      .then(() => {
        popupDeleteCard.toggleSubmitBtnText("Да")
        element.removeCard()
        popupDeleteCard.close()
      })
        .catch((error) => {
          popupDeleteCard.toggleSubmitBtnText("Да")
          console.error(`ошибка при удалении карточки ${error}`)
        })
})

const popupProfile = new PopupWithForm(profilePopupSelector, ({ fullname, job }) => {
  popupProfile.toggleSubmitBtnText("Сохранение...")

  api.setUserInfo({ fullname, job })
    .then(res => {
      popupProfile.toggleSubmitBtnText("Сохранить")
      userInfo.setUserInfo({fullname: res.name, job: res.about, avatar: res.avatar})
    })
    .catch((error) => {
      popupProfile.toggleSubmitBtnText("Сохранить")
      console.error(`ошибка при редактировании профиля ${error}`)
    })
    .finally()

  //userInfo.setUserInfo(popupProfile.getInputsValue());
  popupProfile.close();
});

// Форма добавления карточки
const popupAddCard = new PopupWithForm(addCardPopupSelector, (data) => {
    // Promise.all([api.getUserInfo(), api.addNewCard()])
  popupAddCard.toggleSubmitBtnText("Создание...")
    api.addNewCard(data)
        .then((card) => {
          popupAddCard.toggleSubmitBtnText("Создать")
          card.myId = myId
            section.addItemPrepend(newCard(card));
            popupAddCard.close();
        })
        //section.addItem(newCard(data))
        .catch((error) => {
          popupAddCard.toggleSubmitBtnText("Создать")
          console.error(`ошибка при создании новой карточки ${error}`)
        })
        .finally();
});

// Форма Avatar
const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  popupAvatar.toggleSubmitBtnText("Сохранение...")
    api.setUserAvatar(data)
        .then((res) => {
          popupAvatar.toggleSubmitBtnText("Сохранить")
            console.log(res);
            userInfo.setUserInfo({ fullname: res.name, job: res.about, avatar: res.avatar });
        })
        .catch((error) => {
          popupAvatar.toggleSubmitBtnText("Сохранить")
          console.error(`ошибка при обновлении avatar ${error}`)
        });
    //document.querySelector(".profile__avatar").src = data.avatar;
    popupAvatar.close();
});

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

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

// Создаём экземпляры карточек
function newCard(element) {
    const card = new Card(element, selectorTemplate, popupImage.open, popupDeleteCard.open, (likeElement, cardId) => {
      console.log('likeElement', likeElement.classList)

      // if (likeElement.classList.contains(".card__button-like")) { //ошибка. В списке классов нет .
      if (likeElement.classList.contains("card__button-like")) {
            api.deleteLike(cardId)
                .then((res) => {
                    console.log('delete like', res);
                    card.toggleLike(res.likes);
                })
                .catch((error) => console.error(`ошибка при снятии лайка ${error}`));
        } else {
            api.addLike(cardId)
                .then((res) => {
                  console.log('add like', res);
                    card.toggleLike(res.likes);
                })
                .catch((error) => console.error(`ошибка при добавлении лайка ${error}`));
        }
    });
    return card.createCard();
}

// Валидация форм
Array.from(document.forms).forEach(item => {
  const form = new FormValidator(validationConfig, item);
  const name = item.dataset.name;
  formsValidator[name] = form
  form.enableValidation()
});

// Обработчик клика кнопки avatar
document.querySelector(".profile__image").addEventListener("click", () => {
  popupAvatar.open();
  formsValidator[profileAvatarFormDataName].resetForm()
 });

// Массив Promise асинхронных методов
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([getUserInfo, initialCards]) => {
      myId = getUserInfo._id
        userInfo.setUserInfo({ fullname: getUserInfo.name, job: getUserInfo.about, avatar: getUserInfo.avatar });
        //console.log(getUserInfo)
      initialCards.forEach(card => card.myId = getUserInfo._id);
        section.addCardArray(initialCards);
 })
  .catch((error) => console.error(`ошибка при создании данных страницы ${error}`))
