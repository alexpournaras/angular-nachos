import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../state.service';

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

  get subscribeEmail() { return this.subscribeForm.get('email'); }
  get contactEmail() { return this.contactForm.get('email'); }
  get contactMessage() { return this.contactForm.get('message'); }

  constructor(private formBuilder: FormBuilder, private stateService: StateService) { }

  onSubscribe() {
    if (this.subscribeForm.valid) {
      this.stateService.subscribe(this.subscribeForm.value.email);

      this.subscribeForm.reset();
      this.subscribeComplete = true;
    }
  }

  onMessageSend() {
    if (this.contactForm.valid) {
      this.stateService.sendMessage(this.contactForm.value);

      this.contactForm.reset();
      this.messageSent = true;
    }
  }

}
