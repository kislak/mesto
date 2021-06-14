export const escape = 'Escape';

export const cardTemplateSelector = '#element-template';

export const validationConfig = {
    inputSelector:          '.popup__field',
    submitButtonSelector:   '.popup__submit',
    errorClass:             'popup__input-error_visible',
    fieldErrorClass:        'popup__field_invalid'
};

export const elementsList = document.querySelector('.elements__list');

const picturePopup = document.querySelector('.popup_type_image');
export const picturePopupImage = picturePopup.querySelector('.popup__image');
export const picturePopupImageName = picturePopup.querySelector('.popup__image-name');

export const addPlaceButton = document.querySelector('.profile__add-button');

export const profileName = document.querySelector('.profile__name-text');
export const profileTitle = document.querySelector('.profile__title');
export const editProfileButton = document.querySelector('.profile__edit-button');
