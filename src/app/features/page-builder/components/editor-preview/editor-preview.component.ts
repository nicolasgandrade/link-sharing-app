import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PageData } from '../../models/page-form.model';

@Component({
  selector: 'app-editor-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor-preview.component.html',
  styleUrl: './editor-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorPreviewComponent {
  @Input() pageData?: PageData;
}
