
import { TestBed } from '@angular/core/testing';
import { RegistroProducto } from './registro-producto';

describe('Registro de Productos', () => {
  let componente: RegistroProducto;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProducto]
    }).compileComponents();

    const fixture = TestBed.createComponent(RegistroProducto);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('2. Debe rechazar campos obligatorios vacíos', () => {
    componente.formulario.setValue({
      nombre: '',
      precio: 0,
      stock: 0
    });

    expect(componente.formulario.invalid).toBe(true);
  });

  it('3. Debe rechazar nombres menores a 3 caracteres', () => {
    componente.formulario.setValue({
      nombre: 'AB',
      precio: 50,
      stock: 10
    });

    expect(componente.formulario.controls.nombre.invalid).toBe(true);
  });

  it('4. Debe rechazar precios negativos', () => {
    componente.formulario.setValue({
      nombre: 'Teclado',
      precio: -10,
      stock: 5
    });

    expect(componente.formulario.controls.precio.invalid).toBe(true);
  });

  it('5. Debe aceptar datos válidos', () => {
    componente.formulario.setValue({
      nombre: 'Teclado Logitech',
      precio: 85.90,
      stock: 20
    });

    expect(componente.formulario.valid).toBe(true);
  });
});
