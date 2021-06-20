import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(placeForm, submitHandler) {
        super(placeForm);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__submit');
        this._submitButton.disabled = true;
        this._inputFileds = Array.from(this._form.querySelectorAll('.popup__field'))
    }

    close() {
        super.close()
        this._form.reset();
        this._submitButton.disabled = true;
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._submitHandler);
        super.setEventListeners();
    }

    _getInputValues() {
        return Object.fromEntries(
            this._inputFileds.map(({ name, value }) => {
                return [name, value]
            })
        );
    }
}
