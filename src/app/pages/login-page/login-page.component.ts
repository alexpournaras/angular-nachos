import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loggedUser: string | null = null;
  loginStatus: boolean | null = null;
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  // Getters to access form variables
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private formBuilder: FormBuilder, private stateService: StateService) { }

  onSubmit() {
    if (this.loginForm.valid) {
      // Check if user exists and passwords match
      let user :User | null = this.stateService.loginUser(this.loginForm.value);

      if (user) {
        this.loginStatus = true;
        this.loggedUser = user.email;
      }
      
      else this.loginStatus = false;
      this.loginForm.reset();
    }
  }
}
