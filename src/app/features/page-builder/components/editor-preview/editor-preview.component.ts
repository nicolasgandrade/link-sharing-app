import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-editor-preview',
  standalone: true,
  templateUrl: './editor-preview.component.html',
  styleUrl: './editor-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPreviewComponent {}
