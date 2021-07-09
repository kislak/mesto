import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
    }

    open(card) {
        this._card = card
        super.open()
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._card, evt)
        });
        super.setEventListeners();
    }
}
