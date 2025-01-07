import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Panel } from 'primeng/panel';
import { PageData, PageForm } from '../../models/page-form.model';
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
    slug: new FormControl(''),
    pictureUrl: new FormControl('https://avatar.iran.liara.run/public/43'),
    title: new FormControl('Your beautiful name'),
    subtitle: new FormControl('You can write your role here'),
    bgColor: new FormControl('#ffffff'),
    textColor: new FormControl('#333'),
    buttons: new FormArray([
      new FormControl({
        label: 'Anything you want!',
        url: 'https://avatar.iran.liara.run/public/43',
        bgColor: '#000',
        textColor: '#ffffff',
      }),
    ]),
  });

  @Input() set existingPage(page: PageData | null | undefined) {
    if (!!page) {
      this.form?.patchValue(page);
    }
  }

  addLinkButton(): void {
    this.form.controls.buttons.push(
      new FormControl({
        label: 'New button',
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
