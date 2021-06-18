import Popup from "./Popup.js";

import { picturePopupImage, picturePopupImageName } from "./constants.js"

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open({ name, link }) {
        picturePopupImage.src = link;
        picturePopupImage.alt = name;
        picturePopupImageName.textContent = name;
        super.open();
    }
}

