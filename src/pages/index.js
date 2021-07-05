import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

import Api from "../components/Api.js";

import {
    elementsList,
    cardTemplateSelector,
    validationConfig,
    addPlaceButton,
    editProfileButton
} from "../components/constants.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: 'f852889b-4e45-42a6-a8c2-82025ba7c42c',
        'Content-Type': 'application/json'
    }
});

const popupWithImage = new PopupWithImage('.popup_type_image');

const createCard = (item) => {
    const card = new Card(item, cardTemplateSelector, () => {
        popupWithImage.open(item);
    });
    return card.generateCard();
};


api.getUser().then((user) => {
    const userInfo = new UserInfo('.profile__name-text', '.profile__title');
    const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt, { name, title }) => {
        evt.preventDefault();
        api.setUser(name, title).then( () => {
            userInfo.setUserInfo( { name, title })
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            profilePopup.close();
        });
    })
    const profileValidator = new FormValidator(validationConfig, 'form[name="editProfile"]');

    editProfileButton.addEventListener('click', () => {
        const { name, title } = userInfo.getUserInfo();
        profilePopupName.value = name;
        profilePopupTitle.value = title;
        profileValidator.disableSubmitButton();
        profilePopup.open()
    });

    const profilePopupName = profilePopup._form.querySelector('#popup__input-profile-name');
    const profilePopupTitle = profilePopup._form.querySelector('#popup__input-profile-title');

    profilePopup.setEventListeners();
    profileValidator.enableValidation();

    userInfo.setUserInfo( { name: user.name, title: user.about })
})
.catch((err) => {
    console.log(err);
});


api.getInitialCards().then((initialCards) => {
    const section = new Section({ items: initialCards, renderer: (item) => {
            section.addItem(createCard(item));
        }
    }, elementsList)

    const placePopup = new PopupWithForm('.popup_type_add-place', (evt, { name, link }) => {
        evt.preventDefault();
        section.addItem(createCard( { name, link }));
        placePopup.close();
    });

    placePopup.setEventListeners();

    addPlaceButton.addEventListener('click', () => {
        placeValidator.disableSubmitButton();
        placePopup.open()
    });

    const placeValidator = new FormValidator(validationConfig, 'form[name="addPlace"]');

    popupWithImage.setEventListeners();
    placeValidator.enableValidation();

    section.render();
})
.catch((err) => {
    console.log(err);
});



