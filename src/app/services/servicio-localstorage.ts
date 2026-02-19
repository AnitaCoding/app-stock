import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ServicioLocalstorage {

  getArrayVirgenes(){
    const arrayActual = JSON.parse(localStorage.getItem('productosVirgenes')!);
    return arrayActual
  }

  getArrayFabricados(){
    const arrayActual = JSON.parse(localStorage.getItem('productosFabricados')!);
    return arrayActual
  }

  getArrayProductos(nombreArray:string){
    const arrayActual = JSON.parse(localStorage.getItem(nombreArray)!); 
    return arrayActual
  }

  getArrayAlertas(){
    const arrayActual = JSON.parse(localStorage.getItem('alertasProductos')!);
    return arrayActual
  }

  setArrayVirgenes(arrayProductos:Producto[]){
    localStorage.setItem('productosVirgenes', JSON.stringify(arrayProductos))
  }
  
  setArrayFabricados(arrayProductos:Producto[]){
    localStorage.setItem('productosFabricados', JSON.stringify(arrayProductos))
  }

  setArrayProductos(nombreArray:string, arrayProductos:Producto[]){
    localStorage.setItem(nombreArray, JSON.stringify(arrayProductos))
  }

  setArrayAlertas(arrayAlertas:Producto[]){
    localStorage.setItem('alertasProductos', JSON.stringify(arrayAlertas))
  }
}
