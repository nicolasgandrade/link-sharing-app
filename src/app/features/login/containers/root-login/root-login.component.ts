import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-root-login',
  standalone: true,
  imports: [Button],
  template: `<p-button (onClick)="auth.loginWithRedirect()">Login</p-button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootLoginComponent {
  protected readonly auth = inject(AuthService);
}
