import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { PageForm } from '../../models/page-form.model';

@Component({
  selector: 'app-page-form',
  standalone: true,
  imports: [InputText, ReactiveFormsModule],
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFormComponent {
  @Input() form?: FormGroup<PageForm>;
}
