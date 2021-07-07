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

const createCard = (item, current_user) => {
    const cardClickHandler = () => {
        popupWithImage.open(item);
    }

    const deleteButtonClickHandler = (id, card) => {
        api.deleteCard(id).then( () => {
            card.remove();
        }).catch((err) => {
            console.log(err);
        });
    }

    const heartClickHandler = (target, cardId, likeCounter) => {
        target.disabled = true;

        if (target.classList.contains('element__heart_active')) {
            target.classList.remove('element__heart_active');

            api.removeLike(cardId).then((item) => {
                likeCounter.textContent = item.likes.length;
            }).catch((err) => {
                console.log(err);
                target.classList.add('element__heart_active');
            }).finally(() => {
                target.disabled = false;
            })
        } else {
            target.classList.add('element__heart_active')
            api.addLike(cardId).then((item) => {
                likeCounter.textContent = item.likes.length;
            }).catch((err) => {
                console.log(err);
                target.classList.remove('element__heart_active')
            }).finally(() => {
                target.disabled = false;
            })
        }
    };

    const card = new Card(
        item,
        current_user,
        cardTemplateSelector,
        cardClickHandler,
        deleteButtonClickHandler,
        heartClickHandler)

    return card.generateCard();
};

const userInfo = new UserInfo('.profile__name-text', '.profile__title');
const profileValidator = new FormValidator(validationConfig, 'form[name="editProfile"]');

api.getUser().then((user) => {
    const profilePopup = new PopupWithForm('.popup_type_edit-profile', (evt, { name, title }) => {
        evt.preventDefault();
        api.setUser(name, title).then( (res) => {
            userInfo.setUserInfo( { name: res.name, title: res.about })
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            profilePopup.close();
        });
    })
    const profilePopupName = profilePopup._form.querySelector('#popup__input-profile-name');
    const profilePopupTitle = profilePopup._form.querySelector('#popup__input-profile-title');

    editProfileButton.addEventListener('click', () => {
        const { name, title } = userInfo.getUserInfo();
        profilePopupName.value = name;
        profilePopupTitle.value = title;
        profileValidator.disableSubmitButton();
        profilePopup.open()
    });

    profilePopup.setEventListeners();
    profileValidator.enableValidation();

    userInfo.setUserInfo( { name: user.name, title: user.about })

    api.getInitialCards().then((initialCards) => {
        console.log(initialCards);
        const section = new Section({ items: initialCards, renderer: (item) => {
                section.addItem(createCard(item, user));
            }
        }, elementsList)

        const placePopup = new PopupWithForm('.popup_type_add-place', (evt, { name, link }) => {
            evt.preventDefault();
            api.addCard(name, link).then( (item ) => {
                section.prependItem(createCard( item, user ));
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                placePopup.close();
            });
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
    }).catch((err) => {
        console.log(err);
    });
})
.catch((err) => {
    console.log(err);
})
