import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageData } from '../models/page-form.model';

@Injectable()
export class PageService {
  private readonly http = inject(HttpClient);

  publishPage(pageData: PageData): Observable<PageData> {
    return this.http.post<PageData>(`${environment.apiUrl}/pages`, pageData);
  }
}
