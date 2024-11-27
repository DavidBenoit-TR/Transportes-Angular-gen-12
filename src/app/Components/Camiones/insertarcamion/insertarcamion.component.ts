import { Component, ElementRef, ViewChild } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';

@Component({
  selector: 'app-insertarcamion',
  imports: [],
  templateUrl: './insertarcamion.component.html',
  styleUrl: './insertarcamion.component.css',
})
export class InsertarcamionComponent {
  selectFile: File | null = null; //variable para almacenar un archivo

  //Referencias a los elementos HTML
  @ViewChild('matricula') private matricula!: ElementRef; //tanto '@ViewChild' como 'ElementRef' se importan desde '@angular/core'
  @ViewChild('capacidad') private capacidad!: ElementRef;
  @ViewChild('marca') private marca!: ElementRef;
  @ViewChild('modelo') private modelo!: ElementRef;
  @ViewChild('disponibilidad') private disponibilidad!: ElementRef;
  @ViewChild('kilometraje') private kilometraje!: ElementRef;
  @ViewChild('tipo_Camion') private tipo_camion!: ElementRef;
  //Constructor que haga referencia al servicio que sonsumirá las APIS de la imagen y de insertar Camión
  constructor(private service: CamionesService) {}
  
  onFileSelected($event: any) {}
  guardar() {}
}
