import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        const picturePopup = document.querySelector('.popup_type_image');
        this._picturePopupImage = picturePopup.querySelector('.popup__image');
        this._picturePopupImageName = picturePopup.querySelector('.popup__image-name');
    }

    open({ name, link }) {
        this._picturePopupImage.src = link;
        this._picturePopupImage.alt = name;
        this._picturePopupImageName.textContent = name;
        super.open();
    }
}

