export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes_length = data.likes.length;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    generateCard() {
        this._card = this._getElement();
        this._picture = this._card.querySelector('.element__picture');
        this._title = this._card.querySelector('.element__title');
        this._heart = this._card.querySelector('.element__heart');
        this._likeCounter = this._card.querySelector('.element__like-counter');
        this._deleteButton = this._card.querySelector('.element__delete-button');

        this._picture.src = this._link;
        this._picture.alt = this._name;
        this._title.textContent = this._name;
        this._likeCounter.textContent = this._likes_length;

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
        this._picture.addEventListener('click', this._handleCardClick);
    }

    _heartClickHandler = (evt) => evt.target.classList.toggle('element__heart_active');
    _deleteButtonClickHandler = () => this._card.remove();
}
