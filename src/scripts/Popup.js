import { escape } from "./constants.js";

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this.setEventListeners();
        this._popup.classList.add('popup_opened') ;
    }

    close() {
        this._popup.classList.remove('popup_opened');
        removeEventListener('keyup', this._handleEscClose)
    }

    setEventListeners() {
        addEventListener('keyup', this._handleEscClose.bind(this));

        this._popup.addEventListener('click', (evt) => {
            evt.stopPropagation();
            const classList = evt.target.classList

            if (classList.contains('popup') || classList.contains('popup__close')) {
                this.close();
            };
        });
    }

    _handleEscClose(evt) {
        if (evt.key == escape) {
            this.close();
        }
    }
}
