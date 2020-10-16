import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DestinoViaje} from '../models/destino-viaje.model';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  fg: FormGroup;
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  minlongitud = 5;
  searchResults: string[];
  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter<DestinoViaje>();
    this.fg = fb.group({
      nombre: ['', Validators.compose(
        [
          Validators.required,
          this.nombreValidatorParametrizable(this.minlongitud)
        ]
      )],
      url: ['']
    });
    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario: ', form);
    });
  }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement> document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(() => ajax('/assets/datos.json'))
      ).subscribe(ajaxResponse => {
        this.searchResults = ajaxResponse.response;
    });
  }
  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }
  nombreValidator(control: FormControl): {[s: string]: boolean} {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5){
      return {invalidNombre: true};
    }else {
      return null;
    }
  }
  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): {[s:string]:boolean} | null => {
      const l = control.value.toString().length;
      if (l > 0 && l < minLong){
        return {minLongNombre: true};
      }else {
        return null;
      }
    }
  }
}
