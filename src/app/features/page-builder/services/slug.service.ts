import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageData } from '../models/page-form.model';

@Injectable()
export class SlugService {
  private readonly http = inject(HttpClient);

  getIsSlugAvailable(slug: string): Observable<boolean> {
    return this.http.get<PageData>(`${environment.apiUrl}/pages/${slug}`).pipe(
      map((result) => !!result.creatorId),
      catchError((err: HttpErrorResponse) =>
        err.status === HttpStatusCode.NotFound ? of(true) : of(false),
      ),
    );
  }
}
