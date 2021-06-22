import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

import initialCards from "../components/initialCards.js"
import {
    elementsList,
    cardTemplateSelector,
    validationConfig,
    addPlaceButton,
    editProfileButton
} from "../components/constants.js";

const popupWithImage = new PopupWithImage('.popup_type_image');
const userInfo = new UserInfo('.profile__name-text', '.profile__title');

const createCard = (item) => {
    const card = new Card(item, cardTemplateSelector, () => {
        popupWithImage.open(item);
    });
    return card.generateCard();
};

const section = new Section({ items: initialCards, renderer: (item) => {
        section.addItem(createCard(item));
    }
}, elementsList)

const placePopup = new PopupWithForm('.popup_type_add-place', (evt, { name, link }) => {
    evt.preventDefault();
    section.addItem(createCard( { name, link }));
    placePopup.close();
});

const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt, { name, title }) => {
    evt.preventDefault();
    userInfo.setUserInfo( { name, title })
    profilePopup.close();
})

const profileValidator = new FormValidator(validationConfig, 'form[name="editProfile"]');
const placeValidator = new FormValidator(validationConfig, 'form[name="addPlace"]');

const profilePopupName = profilePopup._form.querySelector('#popup__input-profile-name');
const profilePopupTitle = profilePopup._form.querySelector('#popup__input-profile-title');

popupWithImage.setEventListeners();
placePopup.setEventListeners();
profilePopup.setEventListeners();
profileValidator.enableValidation();
placeValidator.enableValidation();

addPlaceButton.addEventListener('click', () => {
    placeValidator.disableSubmitButton();
    placePopup.open()
});

editProfileButton.addEventListener('click', () => {
    const { name, title } = userInfo.getUserInfo();
    profilePopupName.value = name;
    profilePopupTitle.value = title;
    profileValidator.disableSubmitButton();
    profilePopup.open()
});

section.render();
