import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Panel } from 'primeng/panel';
import { EditorPreviewComponent } from '../editor-preview/editor-preview.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [Panel, EditorPreviewComponent],
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;

        @media (min-width: 778px) {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ],
})
export class EditorComponent {}
