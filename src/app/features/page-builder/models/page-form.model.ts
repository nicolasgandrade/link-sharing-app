import { FormArray, FormControl } from '@angular/forms';
import { ButtonLink } from './button-link.model';

export interface PageForm {
  pictureUrl: FormControl<string | null>;
  title: FormControl<string | null>;
  subtitle: FormControl<string | null>;
  buttons: FormArray<FormControl<ButtonLink | null>>;
}
