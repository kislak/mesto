import Popup from "./Popup.js";
import Card from "./Card";
import {cardTemplateSelector} from "./constants";
import {openPopup} from "./index";

export default class PopupWithForm extends Popup {
    constructor(placeForm, submitHandler) {
        super(placeForm);
        this._submitHandler = submitHandler;
    }

    close() {
        placeForm.reset();
        submitPlacePopupButton.disabled = true;
    }

    setEventListeners() {
        placeForm.addEventListener('submit', submitPlace);
        addPlaceButton.addEventListener('click', openPlace);
    }

    _getInputValues() {

    }
}


const openPlace = () => {

}

const submitPlace = (evt) => {
    evt.preventDefault();
    addCard(new Card({ name: placeNameInput.value, link: placeLinkInput.value }, cardTemplateSelector).generateCard());
    closePopup(placePopup)
}
