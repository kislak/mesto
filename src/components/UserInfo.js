export default class UserInfo {
    constructor(nameSelector, aboutSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileTitle = document.querySelector(aboutSelector);
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

}
