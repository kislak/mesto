import initialCards from "./initialCards.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js"

import {
    elementsList,
    cardTemplateSelector,
    validationConfig,
    addPlaceButton,
    profileName,
    profileTitle,
    editProfileButton
} from "./constants.js";

const section = new Section({ items: initialCards, renderer: (item) => {
        const card = new Card(item, cardTemplateSelector).generateCard()
        section.addItem(card);
    }
}, elementsList)

section.render();

const placePopup = new PopupWithForm('.popup_type_add-place', (evt) => {
    evt.preventDefault();
    const card = new Card(placePopup._getInputValues(), cardTemplateSelector).generateCard()
    section.addItem(card);
    placePopup.close();
})

addPlaceButton.addEventListener('click', () => { placePopup.open() });

const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt) => {
    evt.preventDefault();
    const { name, title } = profilePopup._getInputValues()
    profileName.textContent = name;
    profileTitle.textContent = title;
    profilePopup.close();
})

editProfileButton.addEventListener('click', () => {

    profilePopup.open()
});

new FormValidator(validationConfig, 'form[name="editProfile"]').enableValidation();
new FormValidator(validationConfig, 'form[name="addPlace"]').enableValidation();
