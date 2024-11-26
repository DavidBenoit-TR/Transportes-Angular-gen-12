import { Component } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';

@Component({
  selector: 'app-listarcamiones',
  imports: [],
  templateUrl: './listarcamiones.component.html',
  styleUrl: './listarcamiones.component.css',
})
export class ListarcamionesComponent {
  //constructor que utilice una dependencia de mi servicio (camionesservice)
  constructor(private service: CamionesService) {
    //en cuanto inicie mi componente, llamo/Invoco al servicio que consume la api
    this.service.getCamiones();
  }

  //Recupero la lsita de camiones del servicio que se declaró en el mismo, creanod así una instancia Singleton
  get listCamiones() {
    return this.service.listacamiones;
  }
}
