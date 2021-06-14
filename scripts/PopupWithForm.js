import Popup from "./Popup.js";
import {
    placeForm,
    addPlaceButton,
    submitPlacePopupButton
} from "./constants.js"

export default class PopupWithForm extends Popup {
    constructor(placeFormSelector, submitHandler) {
        super(placeFormSelector);
        this._submitHandler = submitHandler;
        submitPlacePopupButton.disabled = true;
    }

    close() {
        super.close()
        placeForm.reset();
        submitPlacePopupButton.disabled = true;
    }

    setEventListeners() {
        placeForm.addEventListener('submit', this._submitHandler);
        super.setEventListeners();
    }

    _getInputValues() {

    }
}
