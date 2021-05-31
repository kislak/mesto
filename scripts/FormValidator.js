export default class FormValidator {
    constructor(config, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._errorClass = config.errorClass;
        this._fieldErrorClass = config.fieldErrorClass;
    }

    enableValidation = () => {
        this._formElement = document.querySelector(this._formSelector)
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement);
                this._toggleButtonState();
            });
        });

        this._formElement.addEventListener('reset', this._resetFormHandler);
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
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._fieldErrorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass)
        inputElement.classList.remove(this._fieldErrorClass);
    };

    _resetFormHandler = () => {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };
}
