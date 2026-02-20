import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-selector-listas-ventas',
  imports: [IonContent, IonButton, RouterLink],
  templateUrl: './selector-listas-ventas.html',
  styleUrl: './selector-listas-ventas.css',
})
export class SelectorListasVentas {

}
