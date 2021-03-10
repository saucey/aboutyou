import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.scss'],
})
export class NewsletterFormComponent {
  @Input() profileForm: FormGroup;

  get newsletter() {
    return this.profileForm.get('newsletter');
  }
}
