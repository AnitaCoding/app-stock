import { Component } from '@angular/core';
import { IonFooter, IonIcon, IonToolbar, IonButton, IonButtons} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star, heart, statsChart } from 'ionicons/icons';
@Component({
  selector: 'app-nav-bar',
  imports: [IonFooter, IonToolbar, IonIcon, IonButton, IonButtons],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor() {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search, star, heart, statsChart});
  }

    mensaje: string = '¡Hola desde el componente!';

  mostrarMensaje() {
    console.log(this.mensaje);
  }

}

