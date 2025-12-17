import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ComunicarDatos {
    productoActual: Producto;
  constructor() {
    this.productoActual = new Producto();
   }
  
}
