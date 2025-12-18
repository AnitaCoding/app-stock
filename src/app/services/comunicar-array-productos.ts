import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComunicarArrayProductos {
  nombreArrayProductos: string;

  constructor(){
    this.nombreArrayProductos = '';
  }
  
}
