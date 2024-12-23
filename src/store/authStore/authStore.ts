import { makeAutoObservable } from "mobx";
import { AuthorizationStatus } from "../../assets/types/enum";

class AuthStore {
    isAuth: AuthorizationStatus = AuthorizationStatus.Unknown;
    profilePhoto: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(type: AuthorizationStatus) {
        this.isAuth = type;
    }
    setToken(token: string) {
        this.isAuth = AuthorizationStatus.Auth;
        localStorage.setItem('token', token);
    }
    logout() {
        this.isAuth = AuthorizationStatus.NoAuth;
        localStorage.removeItem('token');
    }
    setProfilePhoto(photo: string) {
        this.profilePhoto = photo;
    }
}
export const authStore = new AuthStore();
