
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-registro-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-producto.html',
  styleUrl: './registro-producto.css'
})
export class RegistroProducto {
  private fb = new FormBuilder();

  mensaje = '';

  formulario = this.fb.nonNullable.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    precio: [0, [
      Validators.required,
      Validators.min(0.01)
    ]],
    stock: [0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+$/)
    ]]
  });

  registrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.mensaje = 'Producto registrado correctamente';
    console.log(this.formulario.getRawValue());
    this.formulario.reset();
  }
}
