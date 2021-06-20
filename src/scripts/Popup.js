import { escape } from "./constants.js";

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._isOpen = false
    }

    open() {
        this._popup.classList.add('popup_opened') ;
        this._isOpen = true
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._isOpen = false;
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
        if (this._isOpen && evt.key == escape) {
            this.close();
        }
    }
}
