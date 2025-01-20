import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { distinctUntilChanged, map, ReplaySubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ErrorComponent } from '../../../../components/error/error.component';
import { EditorComponent } from '../../components/editor/editor.component';
import { PageData } from '../../models/page-form.model';
import { PageService } from '../../services/page.service';
import { SlugService } from '../../services/slug.service';
import { PageStore } from '../../state/page.store';

@Component({
  selector: 'app-root-page-builder',
  standalone: true,
  imports: [
    RouterModule,
    Toolbar,
    EditorComponent,
    Button,
    AsyncPipe,
    ErrorComponent,
  ],
  providers: [PageService, PageStore, SlugService],
  templateUrl: './root-page-builder.component.html',
  styles: [
    `
      :host {
        padding: 16px;
        padding-bottom: 0;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 16px;
        min-height: 100vh;
        width: 100%;
        max-width: 1468px;
        margin: 0 auto;
      }
    `,
  ],
})
export class RootPageBuilderComponent implements OnInit, OnDestroy {
  @ViewChild(EditorComponent, { static: false }) editor?: EditorComponent;

  private readonly auth = inject(AuthService);
  private readonly pageFacade = inject(PageStore);

  readonly username$ = this.auth.user$.pipe(map((user) => user?.nickname));
  readonly isPosting$ = this.pageFacade.isPosting$;
  readonly existingPage$ = this.pageFacade.page$.pipe(distinctUntilChanged());
  readonly isFetchingPage$ = this.pageFacade.isFetching$;
  readonly hasError$ = this.pageFacade.hasError$;

  private readonly onDestroy$ = new ReplaySubject<void>(1);

  ngOnInit(): void {
    this.pageFacade.getUserPage();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onPublishPage(page: PageData): void {
    if (!page) {
      return;
    }

    this.pageFacade.publishPage(page);
  }

  goToPage(): void {
    window.open(
      `${environment.pageBaseUrl}/${this.editor?.form?.controls?.slug?.value}`,
      '_blank',
    );
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: environment.pageBaseUrl } });
  }
}
