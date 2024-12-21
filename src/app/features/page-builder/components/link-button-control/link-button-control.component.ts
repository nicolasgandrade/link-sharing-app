import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { ColorPicker } from 'primeng/colorpicker';
import { InputText } from 'primeng/inputtext';
import { Panel } from 'primeng/panel';
import { Subject, takeUntil } from 'rxjs';
import { ButtonLink } from '../../models/button-link.model';

@Component({
  selector: 'app-link-button-control',
  standalone: true,
  imports: [InputText, Panel, Button, ColorPicker, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LinkButtonControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './link-button-control.component.html',
  styleUrl: './link-button-control.component.scss',
})
export class LinkButtonControlComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() shouldDisplayTrash = true;
  @Input() index = 0;

  @Output() removeInput = new EventEmitter<void>();

  readonly innerForm = new FormGroup({
    label: new FormControl(''),
    link: new FormControl(''),
    color: new FormControl('#333'),
  });

  private value: Partial<ButtonLink> = {};
  private onChange!: (value: ButtonLink) => void;
  private onTouched!: () => void;

  private onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.innerForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((val) =>
        this.onChange({
          text: val.label || '',
          url: val.link || '',
          color: val.color || '',
        }),
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  writeValue(value: ButtonLink): void {
    this.value = value;
    this.innerForm.setValue(
      {
        label: value.text,
        link: value.url,
        color: value.color || '#333',
      },
      { emitEvent: false },
    );
  }

  registerOnChange(fn: (value: ButtonLink) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
