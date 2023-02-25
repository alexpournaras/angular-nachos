import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private users: User[] = [];
  private subscribes: string[] = [];
  private messages: Message[] = [];

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

  subscribe(email: string) {
    this.subscribes.push(email)
  }

  sendMessage(messageData: Message) {
    this.messages.push(messageData)
  }
}
