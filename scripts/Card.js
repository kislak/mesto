export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link
        this._templateSelector = templateSelector
    }

    generateCard() {
        this._cart = this._getElement();
        this._picture = this._cart.querySelector('.element__picture');
        this._title = this._cart.querySelector('.element__title');
        this._heart = this._cart.querySelector('.element__heart');
        this._deleteButton = this._cart.querySelector('.element__delete-button');

        this._setupPicture();
        this._setupTitle();
        this._setEventListeners();

        return this._cart;
    }

    _escape = 'Escape'
    _picturePopup = document.querySelector('.popup_type_image')
    _picturePopupImage = this._picturePopup.querySelector('.popup__image')
    _picturePopupImageName = this._picturePopup.querySelector('.popup__image-name')
    _closePictureButton = this._picturePopup.querySelector('.popup__close');

    _getElement() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(".element")
            .cloneNode(true);

        return cardElement;
    }

    _setupPicture() {
        this._picture.src = this._link;
        this._picture.alt = this._name;
    }

    _setupTitle() {
        this._title.textContent = this._name;
    }

    _setEventListeners() {
        this._heart.addEventListener('click', this._heartClickHandler);
        this._deleteButton.addEventListener('click', this._deleteButtonClickHandler);
        this._picture.addEventListener('click', this._pictureClickHandler);
        this._closePictureButton.addEventListener('click', this._closePictureButtonClickHandler);
    }

    _heartClickHandler = (evt) => evt.target.classList.toggle('element__heart_active');
    _deleteButtonClickHandler = (evt) => evt.target.closest('.element').remove();
    _pictureClickHandler = () => {
        this._picturePopupImage.src = this._link;
        this._picturePopupImage.alt = this._name;
        this._picturePopupImageName.textContent = this._name;

        addEventListener('keyup', this._escapeHandler);
        this._picturePopup.classList.add('popup_opened') ;
    };

    _closePictureButtonClickHandler = () => {
        removeEventListener('keyup', this._escapeHandler)
        this._picturePopup.classList.remove('popup_opened');
    }

    _escapeHandler = (evt) => {
        if (evt.key == this._escape) {
            this._closePictureButtonClickHandler();
        }
    };
}
