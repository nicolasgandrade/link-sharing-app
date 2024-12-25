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
import { LinkButton } from '../../models/link-button.model';

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
    bgColor: new FormControl('#000'),
    textColor: new FormControl('#ffffff'),
  });

  private onChange!: (value: LinkButton) => void;
  private onTouched!: () => void;

  private onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.innerForm.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((val) =>
        this.onChange({
          text: val.label || '',
          url: val.link || '',
          bgColor: val.bgColor || '#000',
          textColor: val.textColor || '#ffffff',
        }),
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  writeValue(value: LinkButton): void {
    this.innerForm.setValue(
      {
        label: value.text,
        link: value.url,
        bgColor: value.bgColor || '#000',
        textColor: value.textColor || '#ffffff',
      },
      { emitEvent: false },
    );
  }

  registerOnChange(fn: (value: LinkButton) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
