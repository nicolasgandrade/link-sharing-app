import { inject, Injectable, OnDestroy } from '@angular/core';
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
  page?: PageData;
}

const initialState: PageState = {
  isPosting: false,
  page: undefined,
};

@Injectable()
export class PageStore implements OnDestroy {
  private readonly pageService = inject(PageService);
  private readonly pageRequest$ = new Subject<PageData>();
  private readonly state$ = new BehaviorSubject<PageState>(initialState);
  private readonly onDestroy$ = new ReplaySubject<void>(1);

  readonly isPosting$ = this.state$.pipe(map((state) => state.isPosting));
  readonly page$ = this.state$.pipe(map((state) => state.page));

  readonly publishPage = (page: PageData) => {
    this.pageRequest$.next(page);
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
}
