import { escape } from "./constants.js";

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this.setEventListeners();
        this._popupSelector.classList.add('popup_opened') ;
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
    }

    setEventListeners() {
        addEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key == escape) {
            this.close();
        }
    }
}
