import { Component } from '@angular/core';
import { IonButton, IonContent } from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selector-tipo-producto',
  imports: [IonButton, IonContent, RouterLink],
  templateUrl: './selector-tipo-producto.html',
  styleUrl: './selector-tipo-producto.css',
})
export class SelectorTipoProducto {

    elegirArray(s: string){
      
      if(s == 'v'){
        localStorage.setItem('consulta','productosVirgenes');   
      }else if(s =='f'){
        localStorage.setItem('consulta','productosFabricados');
      }
    }
  

}
