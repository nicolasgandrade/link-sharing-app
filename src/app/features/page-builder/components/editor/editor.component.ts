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
    pictureUrl: new FormControl('https://avatar.iran.liara.run/public/43'),
    title: new FormControl('Your beautiful name'),
    subtitle: new FormControl('You can write your role here'),
    buttons: new FormArray([
      new FormControl({
        text: 'Anything you want!',
        url: 'https://avatar.iran.liara.run/public/43',
        bgColor: '#000',
        textColor: '#ffffff',
      }),
    ]),
  });

  addLinkButton(): void {
    this.form.controls.buttons.push(
      new FormControl({
        text: 'New button',
        url: '',
        bgColor: '#000',
        textColor: '#ffffff',
      }),
    );
  }

  onRemoveInput(index: number): void {
    this.form.controls.buttons.removeAt(index);
  }
}
