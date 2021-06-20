import { escape } from "./constants.js";

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._escapeHandler = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened') ;
        document.addEventListener('keyup', this._escapeHandler);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._escapeHandler);
    }

    setEventListeners() {
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
