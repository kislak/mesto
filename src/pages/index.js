import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirmation from "../components/PopupConfirmation";

import Api from "../components/Api.js";

import {
    elementsList,
    cardTemplateSelector,
    validationConfig,
    addPlaceButton,
    editProfileButton,
    profileAvatar
} from "../components/constants.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: 'f852889b-4e45-42a6-a8c2-82025ba7c42c',
        'Content-Type': 'application/json'
    }
});

const popupWithImage = new PopupWithImage('.popup_type_image');

const popupConfirmation = new PopupConfirmation('.popup_type_confirmation', (card, evt) => {
    api.deleteCard(card._id).then( () => {
        card.deleteCard();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        popupConfirmation.close();
    });
});

const deleteButtonClickHandler = (card) => { popupConfirmation.open(card); }

const heartClickHandler = (target, card) => {
    target.disabled = true;
    if (card.isLiked()) {
        api.removeLike(card._id).then((item) => {
            card.setLike(false);
            card.setLikeCounter(item.likes.length);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            target.disabled = false;
        })
    } else {
        api.addLike(card._id).then((item) => {
            card.setLike(true);
            card.setLikeCounter(item.likes.length);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            target.disabled = false;
        })
    }
};

const createCard = (item, currentUserId) => {
    const cardClickHandler = () => { popupWithImage.open(item) }

    const card = new Card(
        item,
        currentUserId,
        cardTemplateSelector,
        cardClickHandler,
        deleteButtonClickHandler,
        heartClickHandler)

    return card.generateCard();
};

const userInfo = new UserInfo('.profile__name-text', '.profile__title', '.profile__avatar-image');
const profileValidator = new FormValidator(validationConfig, 'form[name="editProfile"]');

const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt, { name, title }, button, buttonText) => {
    api.setUser(name, title).then( (res) => {
        userInfo.setUserInfo( { name: res.name, title: res.about })
        profilePopup.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        button.textContent = buttonText;
    });
})

const profilePopupName = profilePopup._form.querySelector('#popup__input-profile-name');
const profilePopupTitle = profilePopup._form.querySelector('#popup__input-profile-title');

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', (evt, { link }, button, buttonText) => {
    api.updateAvatar(link).then( (user) => {
        userInfo.setAvatar(user.avatar)
        popupWithAvatar.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        button.textContent = buttonText;
    });

});
const avatarValidator = new FormValidator(validationConfig, 'form[name="changeAvatar"]');
const placeValidator = new FormValidator(validationConfig, 'form[name="addPlace"]');

const section = new Section(elementsList, (item, userId) => { section.addItem(createCard(item, userId)) } )

const placePopup = new PopupWithForm('.popup_type_add-place', (evt, { name, link }, button, buttonText) => {
    api.addCard(name, link).then( (item) => {
        section.prependItem(createCard( item, item.owner._id ));
        placePopup.close();
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        button.textContent = buttonText;
    });
});

popupConfirmation.setEventListeners();
profilePopup.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithImage.setEventListeners();
placePopup.setEventListeners();
avatarValidator.enableValidation();
profileValidator.enableValidation();
placeValidator.enableValidation();

editProfileButton.addEventListener('click', () => {
    const { name, title } = userInfo.getUserInfo();
    profilePopupName.value = name;
    profilePopupTitle.value = title;
    profileValidator.disableSubmitButton();
    profilePopup.open()
});

profileAvatar.addEventListener('click', () => {
    avatarValidator.disableSubmitButton();
    popupWithAvatar.open();
});

addPlaceButton.addEventListener('click', () => {
    placeValidator.disableSubmitButton();
    placePopup.open()
});

Promise.all([api.getUser(), api.getInitialCards()]).then((values) =>
{
    const user = values[0]
    const initialCards = values[1]

    userInfo.setUserInfo( { name: user.name, title: user.about })
    userInfo.setAvatar(user.avatar);
    section.render(initialCards, user._id);
}).catch((err) => { console.log(err) });
