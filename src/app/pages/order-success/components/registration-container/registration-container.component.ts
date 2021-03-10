import { Component } from '@angular/core';
import { AccountService } from 'src/app/core/services/account/account.service';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration-container.component.html',
  styleUrls: ['./registration-container.component.scss'],
})
export class RegistrationContainerComponent {
  constructor(private readonly accountService: AccountService) {}

  public onRegisterClick(): void {
    this.accountService.showEmbeddedRegistration();
  }
}
