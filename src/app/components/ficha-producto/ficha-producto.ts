import { Component } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ficha-producto',
  imports: [IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonButton],
  templateUrl: './ficha-producto.html',
  styleUrl: './ficha-producto.css',
})
export class FichaProducto {

}
