import { Component, inject } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Tarea } from '../../models/tareas.model';
import { TareaStatus } from '../../enums/tarea-status.enum';
import { TareaService } from '../../services/tarea-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'tareas-tarea-formulario',
  templateUrl: './tarea-formulario.component.html',
  styleUrls: ['./tarea-formulario.component.css']
})
export class TareaFormularioComponent {
  // Declaración de Servicios
  private fb: FormBuilder = inject(FormBuilder); //  Permite crear formularios dinamicos
  private tareaService: TareaService = inject(TareaService);
  private router: Router = inject(Router);// Permite haceer redirección de rutas

  tareaForm:FormGroup = this.fb.group({
    // campo: [ valor inicial, [validadores sincronos], [validadores asincronos]]; 
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descruocuib: ['', [Validators.required, Validators.minLength(5)]]
  });

  isFieldValid(field: string): boolean | null {
    return this.tareaForm.controls[field].errors && this.tareaForm.controls[field].touched;
  }

  OnFormSubmit(){
    if(!this.tareaForm.valid){
      this.tareaForm.markAllAsTouched();
      // console.info('El formulario no es válido chikitín');
      return;
    }
    const newTarea: Tarea = {
      status: TareaStatus.PENDIENTE,
      titulo: this.tareaForm.value['titulo'],
      descripcion: this.tareaForm.value['descripcionn']
    }
    console.log("Valores ingresados", newTarea);

    //Registrar tarea
    this.tareaService.agregarTarea(newTarea);

    //Redirigir a Mi lista
    this.router.navigate(['tareas', 'mi-lista']);
  }
}