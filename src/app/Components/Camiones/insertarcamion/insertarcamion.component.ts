import { Component, ElementRef, ViewChild } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';
import Swal from 'sweetalert2';

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

  //método para manejar la imagen seleccionada desde el formulario
  onFileSelected($event: any) {
    this.selectFile = $event.target.files[0]; //almacenamos el archivo seleccionado del formulario
  }
  //método para enviar mi camión (imagen incluida) al servidor (API)
  guardar() {
    //valido si existe o no una imagen
    if (this.selectFile) {
      //indicamos que hay una imagen, creo un FormData para enviarla al servidor
      const formData = new FormData();
      //agrego la imagen al FormData
      formData.append('image', this.selectFile);
      //invoco al servicio que insertará la imagen en el servidor, creando una promesa para retomar la respuesta
      this.service.uploadImage(formData).subscribe((response: any) => {
        //Asigno los valores de las variables qe se enviarán en la petición
        const url_foto = response; //el nombre de la imagen que me devolvío mi API
        const matricula = this.matricula.nativeElement.value;
        const marca = this.marca.nativeElement.value;
        const modelo = this.modelo.nativeElement.value;
        const disponibilidad = this.disponibilidad.nativeElement.value;
        const tipo_camion = this.tipo_camion.nativeElement.value;
        const kilometraje = this.kilometraje.nativeElement.value;
        const capacidad = this.capacidad.nativeElement.value;

        //invoco mi servicio que inserta en el servidor mediante una API
        this.service.insertCamion(
          matricula,
          tipo_camion,
          marca,
          modelo,
          capacidad,
          kilometraje,
          url_foto,
          disponibilidad
        );
      });
    } else {
      //Sweet Alert
      Swal.fire('Error', 'Debe seleccionar una imagen', 'error');
    }
  }
}
