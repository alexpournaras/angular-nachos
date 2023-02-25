import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private users: User[] = [];

  loginUser(userData: User): User | null {
    let user = this.users.find(user => user.username === userData.username);
    if (user) {
      if (user.password == userData.password) return user;
    }

    return null;
  }
  
  registerUser(userData: User) {
    this.users.push(userData);
  }
}
