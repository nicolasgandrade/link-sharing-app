import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Button } from 'primeng/button';
import { Panel } from 'primeng/panel';

@Component({
  selector: 'app-root-login',
  standalone: true,
  imports: [Button, Panel],
  templateUrl: './root-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './root-login.component.scss',
})
export class RootLoginComponent {
  protected readonly auth = inject(AuthService);
}
