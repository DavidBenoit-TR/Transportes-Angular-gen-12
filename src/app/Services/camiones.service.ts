import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CamionesService {
  //crear una lista que recibirá cualquier tipo de dato
  public listacamiones: any[] = [];
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
}
