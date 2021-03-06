import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(form, submitHandler) {
        super(form);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._popup.querySelector('.popup__submit')
        this._buttonText = this._button.textContent;
        this._inputFileds = Array.from(this._form.querySelectorAll('.popup__field'))
    }

    close() {
        super.close()
        this._form.reset();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._button.textContent = "Сохраниние...";
            this._submitHandler(evt, this._getInputValues(), this._button, this._buttonText);
        });
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
