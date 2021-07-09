import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._picturePopupImage = this._popup.querySelector('.popup__image');
        this._picturePopupImageName = this._popup.querySelector('.popup__image-name');
    }

    open({ name, link }) {
        this._picturePopupImage.src = link;
        this._picturePopupImage.alt = name;
        this._picturePopupImageName.textContent = name;
        super.open();
    }
}

