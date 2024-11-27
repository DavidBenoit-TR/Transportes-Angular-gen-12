import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CamionesService {
  //crear una lista que recibirá cualquier tipo de dato
  public listacamiones: any[] = [];
  public camion: any; //un camión único o individual
  //dentro del constructor, genero dependencias para conusmir mis servicios
  constructor(private http: HttpClient) {
    //inicializo la lsita
    this.listacamiones = [];
  }

  //Consumir API que recupera mi lista de camiones
  getCamiones() {
    //con mi cliente HTTP haré la petición  mi URL de listarCamiones
    //creando así una promesa (subscribe) que espera cualquier tipo de respuesta
    // (data:any) y finalmente, cuando obtenga dicha recpuesta, la imprimo en consola
    //y lleno mi objeto listaCamiones
    this.http
      .get('http://localhost:5219/api/Camiones/getCamiones')
      .subscribe((data: any) => {
        console.log(data);
        this.listacamiones = data;
      });
  }

  //Consumir la API que recupera 1 camión x ID
  getCamion(id: number) {
    this.http
      .get('http://localhost:5219/api/Camiones/getCamion/' + id)
      .subscribe((data: any) => {
        console.log(data);
        this.camion = data;
      });
  }

  //Subir una imagen por medio de la API
  //agrego la importación desde RxJS (Reactive Extension for Javascript) para 'observarla'
  uploadImage(formData: FormData): Observable<string> {
    console.log(formData);
    //hago la petición POST para enviar la imagen al servidor
    return this.http
      .post('http://localhost:5219/api/Camiones/upload', formData)
      .pipe(
        //agrego la importación desde RxJS para 'map'
        map((response: any) => {
          console.log(response);
          return response.uniqueFileName;
        })
      );
  }

  //Instalo e invoco Sweet Alert
  //Consumir la API que inserta un nuevo camión
  insertCamion(
    matricula: string,
    tipo_Camion: string,
    marca: string,
    modelo: string,
    capacidad: number,
    kilometraje: number,
    urlFoto: string,
    disponibilidad: string
  ) {
    //convertir el valor de la disponibilidad a un booleano
    let bool: boolean = true;
    bool = disponibilidad == '0' ? false : true;

    //realizo mi peticion htto POST
    this.http
      .post('http://localhost:5219/api/Camiones/insertCamion', {
        iD_Camion: 0,
        matricula: matricula,
        tipo_Camion: tipo_Camion,
        marca: marca,
        modelo: modelo,
        capacidad: capacidad,
        kilometraje: kilometraje,
        urlFoto: urlFoto,
        disponibilidad: bool,
      })
      .subscribe((response: any) => {
        //valido si contiene un error o no
        if (response.respuesta.toUpperCase().includes('ERROR')) {
          //Sweet Alert
          // import Swal from 'sweetalert2';
          Swal.fire('Error', response.respuesta, 'error');
        } else {
          Swal.fire('Correcto!', response.respuesta, 'success').then(() => {
            window.location.replace('/listarcamiones');
          });
        }
      });
  }

  //Consumir la API que actualiza un nuevo camión
  updateCamion(
    ID: number,
    matricula: string,
    tipo_Camion: string,
    marca: string,
    modelo: string,
    capacidad: number,
    kilometraje: number,
    urlFoto: string,
    disponibilidad: string
  ) {
    //convertir el valor de la disponibilidad a un booleano
    let bool: boolean = true;
    bool = disponibilidad == '0' ? false : true;

    //realizo mi peticion htto POST
    this.http
      .put('http://localhost:5219/api/Camiones/updateCamion', {
        iD_Camion: ID,
        matricula: matricula,
        tipo_Camion: tipo_Camion,
        marca: marca,
        modelo: modelo,
        capacidad: capacidad,
        kilometraje: kilometraje,
        urlFoto: urlFoto,
        disponibilidad: bool,
      })
      .subscribe((response: any) => {
        //valido si contiene un error o no
        if (response.respuesta.toUpperCase().includes('ERROR')) {
          //Sweet Alert
          // import Swal from 'sweetalert2';
          Swal.fire('Error', response.respuesta, 'error');
        } else {
          Swal.fire('Correcto!', response.respuesta, 'success').then(() => {
            window.location.replace('/listarcamiones');
          });
        }
      });
  }

  //Consumir la API que elimina un nuevo camión
  deleteCamion(id: any) {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        cancelButton:
          'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
      },
      buttonsStyling: false,
    });

    swalWithTailwindButtons
      .fire({
        title: 'Estás seguro?',
        text: 'Esta acción no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Siuuuuuu',
        cancelButtonText: 'Tons no',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Llamada a la API para eliminar el camión
          this.http
            .delete('http://localhost:5219/api/Camiones/delete/' + id)
            .subscribe((response: any) => {
              console.log(response);
              if (response.respuesta.toUpperCase().includes('ERROR')) {
                swalWithTailwindButtons.fire({
                  title: 'Error',
                  text: response.respuesta,
                  icon: 'error',
                });
              } else {
                if (
                  response.respuesta.toUpperCase().includes('IDENTIFICADOR')
                ) {
                  swalWithTailwindButtons.fire({
                    title: 'Ops!',
                    text: response.respuesta,
                    icon: 'info',
                  });
                } else {
                  swalWithTailwindButtons
                    .fire({
                      title: 'Eliminado',
                      text: response.respuesta,
                      icon: 'success',
                    })
                    .then(() => {
                      window.location.reload();
                    });
                }
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: 'Cancelado',
            text: 'Tu operación ha sido cancelada',
            icon: 'info',
          });
        }
      });
  }
}
