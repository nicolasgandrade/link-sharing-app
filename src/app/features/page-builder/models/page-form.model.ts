import { FormArray, FormControl } from '@angular/forms';
import { LinkButton } from './link-button.model';

export interface PageForm {
  pictureUrl: FormControl<string | null>;
  title: FormControl<string | null>;
  subtitle: FormControl<string | null>;
  buttons: FormArray<FormControl<LinkButton | null>>;
  backgroundColor: FormControl<string | null>;
  textColor: FormControl<string | null>;
}

export interface PageData {
  pictureUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
  buttons?: (LinkButton | null)[];
  backgroundColor?: string | null;
  textColor?: string | null;
}
