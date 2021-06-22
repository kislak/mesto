import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(placeForm, submitHandler) {
        super(placeForm);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputFileds = Array.from(this._form.querySelectorAll('.popup__field'))
    }

    close() {
        super.close()
        this._form.reset();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => this._submitHandler(evt, this._getInputValues()));
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
