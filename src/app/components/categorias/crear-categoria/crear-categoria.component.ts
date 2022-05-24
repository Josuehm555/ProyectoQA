import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  categoria_form: FormGroup = {} as FormGroup;
  enviado: boolean = false;
  cargando: boolean = false;

  private stepper: Stepper = {} as Stepper;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router,
    private categorias_service: CategoriasService) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(evento => {
        if (evento.id === 1 && evento.url === evento.urlAfterRedirects) {
          this.router.navigate(['/inicio/categorias'])
        }
      });

    this.categoria_form = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  get form() { return this.categoria_form.controls }

  anterior() {
    this.stepper.previous();
  }

  siguiente() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.stepper = new Stepper(document.getElementById("stepper_categoria") as HTMLElement, {
      linear: false,
      animation: true,
      selectors: {
        steps: '.step',
        trigger: '.step-trigger',
        stepper: '.bs-stepper'
      }
    });
  }

  crear_categoria() {
    let categoria_info = this.categoria_form.getRawValue();

    this.enviado = true;
    this.cargando = true;


    if (this.categoria_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    this.categorias_service.crear_una_categoria(categoria_info).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
          this.cargando = false;
        } else {
          this.toastr.success(res.body.resultado, 'Se creó la categoría', { timeOut: 2000 });
          this.cargando = false;
          this.router.navigate(['/inicio/categorias'])
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );

    this.enviado = false;
  }

}
