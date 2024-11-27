import { Routes } from '@angular/router';
import { ListarcamionesComponent } from './Components/Camiones/listarcamiones/listarcamiones.component';
import { InsertarcamionComponent } from './Components/Camiones/insertarcamion/insertarcamion.component';

export const routes: Routes = [
  //defino mis rutas
  //Ruta vacía o por default
  { path: '', component: ListarcamionesComponent },
  //Ruta a la lista de camiones
  { path: 'listarcamiones', component: ListarcamionesComponent },
  { path: 'insertarcamion', component: InsertarcamionComponent },
];
