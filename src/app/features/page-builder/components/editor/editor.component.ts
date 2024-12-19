import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Panel } from 'primeng/panel';
import { PageForm } from '../../models/page-form.model';
import { EditorPreviewComponent } from '../editor-preview/editor-preview.component';
import { PageFormComponent } from '../page-form/page-form.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [Panel, EditorPreviewComponent, PageFormComponent],
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
export class EditorComponent {
  @Input() form?: FormGroup<PageForm>;
}
