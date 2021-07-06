import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler
        this._submitButton = this._popup.querySelector('.popup__submit');
    }

    setEventListeners() {
        this._submitButton.addEventListener('click', (evt) => {
            this._submitHandler(evt)
            this.close()
        });
        super.setEventListeners();
    }
}
