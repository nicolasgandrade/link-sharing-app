import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { ColorPicker } from 'primeng/colorpicker';
import { Divider } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PageForm } from '../../models/page-form.model';
import { LinkButtonControlComponent } from '../link-button-control/link-button-control.component';

@Component({
  selector: 'app-page-form',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    InputText,
    ReactiveFormsModule,
    Button,
    Divider,
    LinkButtonControlComponent,
    ColorPicker,
  ],
  templateUrl: './page-form.component.html',
  styles: [
    `
      .input-wrapper {
        display: flex;

        input {
          flex-grow: 1;
          max-width: 500px;
        }
      }

      .color-inputs {
        display: flex;
        justify-content: space-between;
        max-width: 500px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFormComponent {
  @Input() form?: FormGroup<PageForm>;

  @Output() addLinkButton = new EventEmitter<void>();
  @Output() removeInput = new EventEmitter<number>();
}
