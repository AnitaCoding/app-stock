import { Component } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { ComunicarDatos } from '../../services/comunicar-datos';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-ficha-producto',
  imports: [IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonInput],
  templateUrl: './ficha-producto.html',
  styleUrl: './ficha-producto.css',
})
export class FichaProducto {

  productoActual: Producto;

   constructor(public servicio_comunicar_datos: ComunicarDatos){
      this.productoActual = this.servicio_comunicar_datos.productoActual;

      console.log(this.productoActual.cantidad)
   }


      

}
