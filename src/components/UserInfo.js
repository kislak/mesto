export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarImageSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileTitle = document.querySelector(aboutSelector);
        this._profileAvatarImage = document.querySelector(avatarImageSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            title: this._profileTitle.textContent
        };
    }

    setUserInfo({ name, title }) {
        this._profileName.textContent = name;
        this._profileTitle.textContent = title;
    }

    setAvatar(link) {
        this._profileAvatarImage.src = link;
    }

    getAvatar() {
        return this._profileAvatarImage.src;
    }

}
