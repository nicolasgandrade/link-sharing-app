import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  readonly form: FormGroup<PageForm> = new FormGroup({
    pictureUrl: new FormControl(''),
    title: new FormControl(''),
    subtitle: new FormControl(''),
    buttons: new FormArray([new FormControl()]),
  });
}
