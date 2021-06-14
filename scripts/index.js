import initialCards from "./initialCards.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";

import {
    escape,
    cardTemplateSelector,
    validationConfig
} from "./constants.js";

const editProfileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameField = profileForm.querySelector('.popup__field_name_name');
const profileTitleField =  profileForm.querySelector('.popup__field_name_title');
const profileName = document.querySelector('.profile__name-text');
const profileTitle = document.querySelector('.profile__title');

const addPlaceButton = document.querySelector('.profile__add-button');
const placePopup = document.querySelector('.popup_type_add-place');
const placeForm = placePopup.querySelector('.popup__form');
const placeNameInput = placeForm.querySelector('.popup__field_name_name');
const placeLinkInput =  placeForm.querySelector('.popup__field_name_link');
const submitPlacePopupButton = placePopup.querySelector('.popup__submit');

const elementsList = document.querySelector('.elements__list');
const popups = Array.from(document.querySelectorAll('.popup'))

const escapeHandler = (evt) => {
    if (evt.key == escape) {
        closePopup(escapeHandler.popup);
    }
};

export const openPopup = (popup) => {
    escapeHandler.popup = popup
    addEventListener('keyup', escapeHandler);
    popup.classList.add('popup_opened') ;
}

const closePopup = (popup) => {
    removeEventListener('keyup', escapeHandler)
    popup.classList.remove('popup_opened');
}

const openProfile = () => {
    profileForm.reset();
    profileNameField.value = profileName.textContent;
    profileTitleField.value = profileTitle.textContent;
    openPopup(profilePopup);
}

const submitProfile = (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameField.value;
    profileTitle.textContent = profileTitleField.value;
    closePopup(profilePopup);
}

const openPlace = () => {
    placeForm.reset();
    submitPlacePopupButton.disabled = true;
    openPopup(placePopup)
}

const section = new Section({ items: initialCards, renderer: (item) => {
        const card = new Card(item, cardTemplateSelector).generateCard()
        section.addItem(card);
    }
}, elementsList)

section.render()

const submitPlace = (evt) => {
    evt.preventDefault();
    section.addItem(new Card({ name: placeNameInput.value, link: placeLinkInput.value }, cardTemplateSelector).generateCard());
    closePopup(placePopup)
}

editProfileButton.addEventListener('click', openProfile);
profileForm.addEventListener('submit', submitProfile);

addPlaceButton.addEventListener('click', openPlace);
placeForm.addEventListener('submit', submitPlace);

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        const classList = evt.target.classList

        if (classList.contains('popup') || classList.contains('popup__close')) {
            closePopup(popup);
        };
    });
});


new FormValidator(validationConfig, 'form[name="editProfile"]').enableValidation();
new FormValidator(validationConfig, 'form[name="addPlace"]').enableValidation();
