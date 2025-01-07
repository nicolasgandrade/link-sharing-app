import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageData } from '../models/page-form.model';

@Injectable()
export class PageService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly onDestroy$ = new Subject<void>();

  private userId?: string;

  constructor() {
    inject(AuthService)
      .user$.pipe(takeUntil(this.onDestroy$))
      .subscribe((user) => (this.userId = user?.sub));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  publishPage(pageData: PageData): Observable<PageData> {
    return this.http.post<PageData>(`${environment.apiUrl}/pages`, pageData);
  }

  getUserPage() {
    return this.http.get<PageData>(
      `${environment.apiUrl}/users/${this.userId}/page`,
    );
  }
}
