import { FormArray, FormControl } from '@angular/forms';
import { LinkButton } from './link-button.model';

export interface PageForm {
  pictureUrl: FormControl<string | null>;
  title: FormControl<string | null>;
  subtitle: FormControl<string | null>;
  buttons: FormArray<FormControl<LinkButton | null>>;
}

export interface PageData {
  pictureUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
  buttons?: (LinkButton | null)[];
}
