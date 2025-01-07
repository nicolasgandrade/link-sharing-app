import { inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { PageData } from '../models/page-form.model';
import { PageService } from '../services/page.service';

interface PageState {
  isPosting: boolean;
  isFetching: boolean;
  page?: PageData;
}

const initialState: PageState = {
  isPosting: false,
  isFetching: false,
  page: undefined,
};

@Injectable()
export class PageStore implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly pageService = inject(PageService);

  private readonly pageRequest$ = new Subject<PageData>();
  private readonly getPage$ = new Subject<void>();
  private readonly state$ = new BehaviorSubject<PageState>(initialState);
  private readonly onDestroy$ = new ReplaySubject<void>(1);

  readonly isFetching$ = this.state$.pipe(map((state) => state.isFetching));
  readonly isPosting$ = this.state$.pipe(map((state) => state.isPosting));
  readonly page$ = this.state$.pipe(map((state) => state.page));

  readonly getUserPage = () => {
    this.getPage$.next();
  };
  readonly publishPage = (page: PageData) => {
    this.pageRequest$.next(page);
  };

  private readonly fetchingPage = () => {
    this.state$.next({ ...this.state$.getValue(), isFetching: true });
  };
  private readonly fetchPageSuccess = (page: PageData) => {
    this.state$.next({ ...this.state$.getValue(), isFetching: false, page });
  };
  private readonly fetchPageFailure = () => {
    this.state$.next({ ...this.state$.getValue(), isFetching: false });
  };

  private readonly postPage = () => {
    this.state$.next({ ...this.state$.getValue(), isPosting: true });
  };
  private readonly postPageSuccess = (page: PageData) => {
    this.state$.next({ ...this.state$.getValue(), isPosting: false, page });
  };
  private readonly postPageFailure = () => {
    this.state$.next({ ...this.state$.getValue(), isPosting: false });
  };

  constructor() {
    this.setupPageRequestListener();
    this.setupGetPageListener();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private setupPageRequestListener() {
    this.pageRequest$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.postPage()),
        switchMap((pageData) =>
          this.pageService.publishPage(pageData).pipe(
            tap((page) => this.postPageSuccess(page)),
            catchError(() => {
              this.postPageFailure();
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe();
  }

  private setupGetPageListener() {
    this.getPage$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(() => this.fetchingPage()),
        switchMap(() =>
          this.pageService.getUserPage().pipe(
            tap((page) => this.fetchPageSuccess(page)),
            catchError(() => {
              this.fetchPageFailure();
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe();
  }
}
