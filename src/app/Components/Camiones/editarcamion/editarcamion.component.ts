import { Component, ElementRef, ViewChild } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editarcamion',
  imports: [],
  templateUrl: './editarcamion.component.html',
  styleUrl: './editarcamion.component.css',
})
export class EditarcamionComponent {
  private id_param: any; //variable que recibiré desde la URL
  public ID_Camion: number = 0; //variable para almacenar el ID del camión que vamos a trabajar
  selectFile: File | null = null; //variable para almacenar un archivo

  //Referencias a los elementos HTML
  @ViewChild('matricula') private matricula!: ElementRef; //tanto '@ViewChild' como 'ElementRef' se importan desde '@angular/core'
  @ViewChild('capacidad') private capacidad!: ElementRef;
  @ViewChild('marca') private marca!: ElementRef;
  @ViewChild('modelo') private modelo!: ElementRef;
  @ViewChild('disponibilidad') private disponibilidad!: ElementRef;
  @ViewChild('kilometraje') private kilometraje!: ElementRef;
  @ViewChild('tipo_Camion') private tipo_camion!: ElementRef;

  //creo un constructor que haga referencia al servicio que consumirá las APIS de la imagen e insertar camión
  constructor(
    private service: CamionesService,
    private router: ActivatedRoute //agrego la importación desde @angular/router
  ) {
    //en cuanto inicie mi componente, llamo/Invoco al servicio que consume la api que busca al camión x ID
    this.id_param = this.router.params.subscribe((params) => {
      console.log('ID Recuperao: ' + params['id']); //imprimo en consola el valor del parámetro
      this.ID_Camion = params['id']; //asigno el valor del parámetro a la variable ID_Camion
      this.service.getCamion(this.ID_Camion); //invoco el servicio que consume la API de recuperar un único camión (byID)
    });
  }

  //creo un bjeto que se llame camión (para llenarlo con los datos recuperados de la API instancia Singleton)
  get camion() {
    return this.service.camion;
  }

  //método para manejar la imagen seleccionada desde el formulario
  onFileSelected($event: any) {
    this.selectFile = $event.target.files[0]; //almacenamos el archivo seleccionado del formulario
  }

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
        this.service.updateCamion(
          this.ID_Camion,
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
      //Asigno los valores de las variables qe se enviarán en la petición
      const url_foto = this.service.camion.urlFoto; //paso la imagen original del modelo
      const matricula = this.matricula.nativeElement.value;
      const marca = this.marca.nativeElement.value;
      const modelo = this.modelo.nativeElement.value;
      const disponibilidad = this.disponibilidad.nativeElement.value;
      const tipo_camion = this.tipo_camion.nativeElement.value;
      const kilometraje = this.kilometraje.nativeElement.value;
      const capacidad = this.capacidad.nativeElement.value;

      //invoco mi servicio que inserta en el servidor mediante una API
      this.service.updateCamion(
        this.ID_Camion,
        matricula,
        tipo_camion,
        marca,
        modelo,
        capacidad,
        kilometraje,
        url_foto,
        disponibilidad
      );
    }
  }
}
