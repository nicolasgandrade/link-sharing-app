import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { Panel } from 'primeng/panel';
import { PageData, PageForm } from '../../models/page-form.model';
import { isSlugAvailableValidator } from '../../services/form-validators';
import { SlugService } from '../../services/slug.service';
import { EditorPreviewComponent } from '../editor-preview/editor-preview.component';
import { PageFormComponent } from '../page-form/page-form.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [Panel, EditorPreviewComponent, PageFormComponent, Button, Divider],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  @Input() isPosting = false;

  @Output() publishPage = new EventEmitter<PageData>();

  private readonly slugService = inject(SlugService);

  readonly form: FormGroup<PageForm> = new FormGroup({
    slug: new FormControl(
      '',
      [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)],
      [isSlugAvailableValidator(this.slugService)],
    ),
    pictureUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]+)?(\/[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%-]*)?$/,
      ),
    ]),
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', [Validators.required]),
    bgColor: new FormControl('', [Validators.required]),
    textColor: new FormControl('', [Validators.required]),
    linkButtons: new FormArray([
      new FormControl(
        {
          label: '',
          url: '',
          bgColor: '',
          textColor: '',
        },
        [Validators.required],
      ),
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
