import { FormArray, FormControl } from '@angular/forms';
import { LinkButton } from './link-button.model';

export interface PageForm {
  slug: FormControl<string | null>;
  pictureUrl: FormControl<string | null>;
  title: FormControl<string | null>;
  subtitle: FormControl<string | null>;
  buttons: FormArray<FormControl<LinkButton | null>>;
  bgColor: FormControl<string | null>;
  textColor: FormControl<string | null>;
}

export interface PageData {
  slug?: string | null;
  pictureUrl?: string | null;
  title?: string | null;
  subtitle?: string | null;
  buttons?: (LinkButton | null)[];
  bgColor?: string | null;
  textColor?: string | null;
}
