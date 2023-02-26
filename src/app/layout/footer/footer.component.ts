import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  subscribeComplete: boolean = false;
  subscribeForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  messageSent: boolean = false;
  contactForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });

  // Getters to access form variables
  get subscribeEmail() { return this.subscribeForm.get('email'); }
  get contactEmail() { return this.contactForm.get('email'); }
  get contactMessage() { return this.contactForm.get('message'); }

  constructor(private formBuilder: FormBuilder, private stateService: StateService) { }

  onSubscribe() {
    // Save emails to state service
    if (this.subscribeForm.valid) {
      this.stateService.subscribe(this.subscribeForm.value.email);

      this.subscribeForm.reset();
      this.subscribeComplete = true;
    }
  }

  onMessageSend() {
    // Save messages to state service
    if (this.contactForm.valid) {
      this.stateService.sendMessage(this.contactForm.value);

      this.contactForm.reset();
      this.messageSent = true;
    }
  }

}
