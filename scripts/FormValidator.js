export default class FormValidator {
    constructor(config, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._errorClass = config.errorClass;
    }

    enableValidation = () => {
        this._formElement = document.querySelector(this._formSelector)
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

        this._formElement.addEventListener('submit', (evt) => evt.preventDefault());

        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _toggleButtonState = () => {
        this._buttonElement.disabled = this._hasInvalidInput();
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => !inputElement.validity.valid )
    };

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass)
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass)
    };
}
