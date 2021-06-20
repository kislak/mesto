import '../pages/index.css';
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";

import initialCards from "./initialCards.js"
import {
    elementsList,
    cardTemplateSelector,
    validationConfig,
    addPlaceButton,
    editProfileButton
} from "./constants.js";

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const userInfo = new UserInfo('.profile__name-text', '.profile__title');

const section = new Section({ items: initialCards, renderer: (item) => {
        const card = new Card(item, cardTemplateSelector, () => {
                popupWithImage.open(item);
            });
        section.addItem(card.generateCard());
    }
}, elementsList)

const placePopup = new PopupWithForm('.popup_type_add-place', (evt) => {
    evt.preventDefault();
    const { name, link } = placePopup._getInputValues()
    const card = new Card({ name, link }, cardTemplateSelector, () => {
        popupWithImage.open({ name, link });
    })
    section.addItem(card.generateCard());
    placePopup.close();
});
placePopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt) => {
    evt.preventDefault();
    const { name, title } = profilePopup._getInputValues()
    userInfo.setUserInfo(name, title)
    profilePopup.close();
})
profilePopup.setEventListeners();

new FormValidator(validationConfig, 'form[name="editProfile"]').enableValidation();
new FormValidator(validationConfig, 'form[name="addPlace"]').enableValidation();

addPlaceButton.addEventListener('click', () => { placePopup.open() });

editProfileButton.addEventListener('click', () => {
    const { name, title } = userInfo.getUserInfo();
    profilePopup._form.querySelector('#popup__input-profile-name').value = name;
    profilePopup._form.querySelector('#popup__input-profile-title').value = title;
    profilePopup.open()
});

section.render();
