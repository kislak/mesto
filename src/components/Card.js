export default class Card {
    constructor(data, currentUserId, templateSelector, handleCardClick, handleDeleteButtonClick, heartClickHandler) {
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likesLength = data.likes.length;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleHeartClick = heartClickHandler

        this._currentUserId = currentUserId
        this._ownerId = data.owner._id

        this._like_on = data.likes.map((like) => like._id).includes(this._currentUserId)
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

        if (this._like_on) {
          this._heart.classList.add('element__heart_active');
        }

        this._likeCounter.textContent = this._likesLength;
        this._deleteButton.hidden = !this._can_delete();

        this._setEventListeners();
        return this._card;
    }

    deleteCard() {
        this._card.remove();
    }

    setLike(state) {
        this._like_on = state;
        if (this._like_on) {
            this._heart.classList.add('element__heart_active');
        } else {
            this._heart.classList.remove('element__heart_active');
        }
    }

    isLiked() {
        return this._like_on
    }

    setLikeCounter(number) {
        this._likesLength = number;
        this._likeCounter.textContent = number;
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
        this._deleteButton.addEventListener('click', () => { this._handleDeleteButtonClick(this) });
        this._picture.addEventListener('click', this._handleCardClick);
    }

    _heartClickHandler = (evt) => {
        this._handleHeartClick(evt.target, this)
    }

    _can_delete() {
        return this._ownerId == this._currentUserId;
    }
 }
