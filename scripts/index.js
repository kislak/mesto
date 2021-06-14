import initialCards from "./initialCards.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js"

import {
    elementsList,
    cardTemplateSelector,
    validationConfig,
    placeNameInput,
    placeLinkInput,
    addPlaceButton
} from "./constants.js";

const editProfileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileForm = profilePopup.querySelector('.popup__form');
const profileNameField = profileForm.querySelector('.popup__field_name_name');
const profileTitleField =  profileForm.querySelector('.popup__field_name_title');
const profileName = document.querySelector('.profile__name-text');
const profileTitle = document.querySelector('.profile__title');


// const escapeHandler = (evt) => {
//     if (evt.key == escape) {
//         closePopup(escapeHandler.popup);
//     }
// };
//
// export const openPopup = (popup) => {
//     escapeHandler.popup = popup
//     addEventListener('keyup', escapeHandler);
//     popup.classList.add('popup_opened') ;
// }
//
// const closePopup = (popup) => {
//     removeEventListener('keyup', escapeHandler)
//     popup.classList.remove('popup_opened');
// }





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

editProfileButton.addEventListener('click', openProfile);
profileForm.addEventListener('submit', submitProfile);








const section = new Section({ items: initialCards, renderer: (item) => {
        const card = new Card(item, cardTemplateSelector).generateCard()
        section.addItem(card);
    }
}, elementsList)

section.render();

const popupWithForm = new PopupWithForm('.popup_type_add-place', (evt) => {
    evt.preventDefault();
    const card = new Card({ name: placeNameInput.value, link: placeLinkInput.value }, cardTemplateSelector).generateCard()
    section.addItem(card);
    popupWithForm.close();
})

addPlaceButton.addEventListener('click', () => { popupWithForm.open() });

new FormValidator(validationConfig, 'form[name="editProfile"]').enableValidation();
new FormValidator(validationConfig, 'form[name="addPlace"]').enableValidation();
