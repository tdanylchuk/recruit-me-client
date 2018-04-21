import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  static userPropertyName: string = "userDetails";

  static saveUser(user: any) {

    localStorage.setItem(this.userPropertyName, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(this.userPropertyName));
  }

  static deleteUser() {
    localStorage.removeItem(this.userPropertyName);
  }
}
