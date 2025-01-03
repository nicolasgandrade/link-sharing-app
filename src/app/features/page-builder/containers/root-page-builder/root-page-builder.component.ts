import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { EditorComponent } from '../../components/editor/editor.component';

@Component({
  selector: 'app-root-page-builder',
  standalone: true,
  imports: [RouterModule, Toolbar, EditorComponent, Button],
  templateUrl: './root-page-builder.component.html',
  styles: [
    `
      :host {
        padding: 24px;
        padding-bottom: 0;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 24px;
        min-height: 100vh;

        @media (min-width: 500px) {
        }
      }
    `,
  ],
})
export class RootPageBuilderComponent {
  protected auth = inject(AuthService);
}
