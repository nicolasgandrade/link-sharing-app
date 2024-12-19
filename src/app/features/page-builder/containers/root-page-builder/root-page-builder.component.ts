import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { EditorComponent } from '../../components/editor/editor.component';
import { PageForm } from '../../models/page-form.model';

@Component({
  selector: 'app-root-page-builder',
  standalone: true,
  imports: [RouterModule, Toolbar, EditorComponent],
  templateUrl: './root-page-builder.component.html',
  styles: [
    `
      :host {
        padding: 24px;
        padding-bottom: 0;
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 24px;
        min-height: 100vh;

        @media (min-width: 500px) {
        }
      }
    `,
  ],
})
export class RootPageBuilderComponent implements OnInit {
  form?: FormGroup<PageForm>;

  ngOnInit(): void {
    this.form = new FormGroup({
      pictureUrl: new FormControl(''),
      title: new FormControl(''),
      subtitle: new FormControl(''),
      buttons: new FormArray([new FormControl()]),
    });
  }
}
