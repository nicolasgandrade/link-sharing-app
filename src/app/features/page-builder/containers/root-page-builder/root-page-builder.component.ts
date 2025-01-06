import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { map } from 'rxjs';
import { EditorComponent } from '../../components/editor/editor.component';
import { PageService } from '../../services/page.service';
import { PageStore } from '../../state/page.store';

@Component({
  selector: 'app-root-page-builder',
  standalone: true,
  imports: [RouterModule, Toolbar, EditorComponent, Button, AsyncPipe],
  providers: [PageService, PageStore],
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

        @media (min-width: 500px) {
        }
      }
    `,
  ],
})
export class RootPageBuilderComponent {
  @ViewChild(EditorComponent) editor?: EditorComponent;

  protected readonly auth = inject(AuthService);
  private readonly pageFacade = inject(PageStore);

  readonly username$ = this.auth.user$.pipe(map((user) => user?.sub));
  readonly isPosting$ = this.pageFacade.isPosting$;

  publishPage(): void {
    const formValue = this.editor?.form?.value;
    if (!formValue) {
      return;
    }

    this.pageFacade.publishPage(formValue);
  }
}
