import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    _picturePopup = document.querySelector('.popup_type_image');
    _picturePopupImage = this._picturePopup.querySelector('.popup__image');
    _picturePopupImageName = this._picturePopup.querySelector('.popup__image-name');

    constructor(popupSelector) {
        super(popupSelector);
    }

    open({ name, link }) {
        this._picturePopupImage.src = link;
        this._picturePopupImage.alt = name;
        this._picturePopupImageName.textContent = name;
        super.open();
    }
}

