import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [Message, Button],
  template: `
    <div class="p-panel error-box">
      <i
        class="pi pi-exclamation-triangle"
        style="font-size: 56px; color: #dc2626"
      ></i>

      <p-message severity="error">
        Ops! There was an error fetching your page... <br />
        Try again later or call the support if the error persists.
      </p-message>

      <p-button label="Try again" (onClick)="reloadPage()" />
    </div>
  `,
  styles: `
    :host {
      display: block;
      margin: auto;
    }

    .error-box {
      padding: 24px;
      max-width: 460px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  reloadPage() {
    window.location.reload();
  }
}
