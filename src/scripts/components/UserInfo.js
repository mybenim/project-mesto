export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(configInfo.name);
        this._profileJob = document.querySelector(configInfo.job);
        this._profileAvatar = document.querySelector(configInfo.profileAvatar);
    }

    getUserInfo() {
        return { fullname: this._profileName.textContent, job: this._profileJob.textContent };
    }

    setUserInfo({ fullname, job, avatar }) {
        this._profileName.textContent = fullname;
        this._profileJob.textContent = job;
        this._profileAvatar.src = avatar;
    }
}
