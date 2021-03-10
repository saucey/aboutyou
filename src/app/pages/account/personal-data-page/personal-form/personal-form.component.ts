import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],
})
export class PersonalFormComponent {
  @Input() profileForm: FormGroup;

  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get birthDate() {
    return this.profileForm.get('birthDate');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get phone() {
    return this.profileForm.get('phone');
  }
}
