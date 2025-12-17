import { Component } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-producto',
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto {

}
