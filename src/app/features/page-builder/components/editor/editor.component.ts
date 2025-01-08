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
    pictureUrl: new FormControl(''),
    title: new FormControl(''),
    subtitle: new FormControl(''),
    bgColor: new FormControl(''),
    textColor: new FormControl(''),
    linkButtons: new FormArray([
      new FormControl({
        label: '',
        url: '',
        bgColor: '',
        textColor: '',
      }),
    ]),
  });

  @Input() set existingPage(page: PageData | null | undefined) {
    if (!!page) {
      this.form?.controls.linkButtons?.clear();

      page.linkButtons?.forEach(() =>
        this.form?.controls.linkButtons?.push(
          new FormControl({
            label: '',
            url: '',
            bgColor: '',
            textColor: '',
          }),
        ),
      );
      this.form?.patchValue(page);
    }
  }

  addLinkButton(): void {
    this.form.controls.linkButtons.push(
      new FormControl({
        label: 'New button',
        url: '',
        bgColor: '#000',
        textColor: '#ffffff',
      }),
    );
  }

  onRemoveInput(index: number): void {
    this.form.controls.linkButtons.removeAt(index);
  }
}
