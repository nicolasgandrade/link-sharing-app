import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { SlugService } from './slug.service';

export const isSlugAvailableValidator =
  (slugService: SlugService): AsyncValidatorFn =>
  (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      delay(400),
      switchMap((slug) =>
        slugService
          .getIsSlugAvailable(slug)
          .pipe(
            map((isAvailable) =>
              isAvailable ? null : { slugUnavailable: slug },
            ),
          ),
      ),
    );
  };
