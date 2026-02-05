import { Component } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonItem, IonLabel, IonCardSubtitle, IonButton, IonInput, IonContent } from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-alertas',
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonInput, IonContent],
  templateUrl: './alertas.html',
  styleUrl: './alertas.css',
})
export class Alertas {
  arrayAlertas: Producto[] = []; //esto a lo mejor tendría que ir en constructr o ngoninit
  arrayVirgenes:Producto[] = []
  arrayFabricados: Producto[] = []

  constructor(){
    this.getArrayAlertas()
  }

  
  encuentraProductoVirgen(producto: Producto, c:any){
    this.getArrayVirgenes();
    const productoEncontrado = this.arrayVirgenes.find(p =>
      p.tipo === producto.tipo &&
      p.color === producto.color &&
      p.talla === producto.talla
    );

    this.restarProducto(productoEncontrado!, producto, c);
    this.setArrayVirgenes();
    this.encuentraProductoFabricado(producto, c)
    producto.cantidad = c;
    this.encuentraAlerta(producto, c)
  }

  restarProducto(pEncontrado: Producto, pActual:Producto, cInput:number){
    let cantidad = pActual.cantidad - cInput;
    pEncontrado.cantidad -= cantidad

  }
  encuentraAlerta(producto: Producto, c:any){
    this.getArrayAlertas();
    const productoEncontrado = this.arrayAlertas.find(p =>
      p.id === producto.id
    );
    this.restarProducto(productoEncontrado!, producto, c);

    if(c == 0){
      this.eliminarProducto(producto)
    }
    this.setArrayAlertas();
  }

  encuentraProductoFabricado(producto:Producto, c:any){
    this.getArrayFabricados();
      const productoEncontrado = this.arrayFabricados.find(p =>
        p.id === producto.id
      );
      this.modificarProductoFabricado(productoEncontrado!, producto, c)
      this.setArrayFabricados()
  }

  modificarProductoFabricado(pEncontrado: Producto, pActual:Producto, cInput:number){
    let cantidad = pActual.cantidad - cInput;
    pEncontrado.cantidad += cantidad
  }
 
  getArrayVirgenes(){
    this.arrayVirgenes = JSON.parse(localStorage.getItem('productosVirgenes')!)
  }

  getArrayAlertas(){
    this.arrayAlertas = JSON.parse(localStorage.getItem('alertasProductos')!)
  }

  getArrayFabricados(){
    this.arrayFabricados = JSON.parse(localStorage.getItem('productosFabricados')!)
  }

  setArrayVirgenes(){
    localStorage.setItem('productosVirgenes', JSON.stringify(this.arrayVirgenes));
  
  }

  setArrayAlertas(){
    localStorage.setItem('alertasProductos', JSON.stringify(this.arrayAlertas));
  }

  setArrayFabricados(){
    localStorage.setItem('productosFabricados', JSON.stringify(this.arrayFabricados));
  }

  eliminarProducto(producto: Producto){
    this.arrayAlertas = this.arrayAlertas.filter(p => p.id !== producto.id);
  }
}