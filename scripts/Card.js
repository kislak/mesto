import PopupWithImage from "./PopupWithImage.js";
const popupWithImage = new PopupWithImage('.popup_type_image')

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    generateCard() {
        this._card = this._getElement();
        this._picture = this._card.querySelector('.element__picture');
        this._title = this._card.querySelector('.element__title');
        this._heart = this._card.querySelector('.element__heart');
        this._deleteButton = this._card.querySelector('.element__delete-button');

        this._picture.src = this._link;
        this._picture.alt = this._name;
        this._title.textContent = this._name;

        this._setEventListeners();

        return this._card;
    }

    _getElement() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(".element")
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._heart.addEventListener('click', this._heartClickHandler);
        this._deleteButton.addEventListener('click', this._deleteButtonClickHandler);
        this._picture.addEventListener('click', this._pictureClickHandler);
    }

    _heartClickHandler = (evt) => evt.target.classList.toggle('element__heart_active');

    _deleteButtonClickHandler = () => this._card.remove();

    _pictureClickHandler = () => {
        popupWithImage.open({link: this._link, name: this._name })
    };
}
