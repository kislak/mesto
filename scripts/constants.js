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

export const placePopup = document.querySelector('.popup_type_add-place');
export const placeForm = placePopup.querySelector('.popup__form');
export const placeNameInput = placeForm.querySelector('.popup__field_name_name');
export const placeLinkInput =  placeForm.querySelector('.popup__field_name_link');
export const addPlaceButton = document.querySelector('.profile__add-button');
export const submitPlacePopupButton = placePopup.querySelector('.popup__submit');
