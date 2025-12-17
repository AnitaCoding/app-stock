import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInput, IonItem, IonList, IonButton, IonText, IonSegment, IonLabel, IonSegmentButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-nuevo-producto',
  imports: [IonInput, IonItem, IonList, IonButton, IonText, IonSegment, IonLabel, IonSegmentButton,
    FormsModule
  ],
  templateUrl: './nuevo-producto.html',
  styleUrl: './nuevo-producto.css',
})

export class NuevoProducto{


  opcionSeleccionada: string = 'virgen';

  //array de productos. No hace falta indicar si son vírgenes o no,
  //porque solo trabajaremos un array cada vez

  arrayProductos: Producto[] = []; 


  nuevoProducto: Producto = {
    tipo: '',
    color: '',
    talla: '',
    cantidad: 0,
    modelo: ''
  }

  //Añadir producto al array de productos que corresponda
  almacenarProducto(){

    
  }

  botonGuardar(){
    this.obtenerProductos();
    this.guardarProductos();
    
  }

  botonCancelar(){
    this.nuevoProducto.tipo = '';
    this.nuevoProducto.color = '';
    this.nuevoProducto.talla = '';
    this.nuevoProducto.cantidad = 0;
    this.nuevoProducto.modelo = '';
  }

  guardarProductos(){

    this.arrayProductos.push(this.nuevoProducto);

    if (this.opcionSeleccionada === 'virgen'){
      localStorage.setItem('productosVirgenes', JSON.stringify(this.arrayProductos));
    }else{
      localStorage.setItem('productosFabricados', JSON.stringify(this.arrayProductos));
    }

  }

  obtenerProductos(){
    let productosAlmacenados;

    //Se utiliza el operador nullish ?? en lugar de hacer un if que chequee si existe el array 
    //en el localstorage, si no existe, lo crea

    if(this.opcionSeleccionada === 'virgen'){
      productosAlmacenados = localStorage.getItem('productosVirgenes') ?? '[]';
    }else{
      productosAlmacenados = localStorage.getItem('productosFabricados') ?? '[]';
    }

    this.arrayProductos = JSON.parse(productosAlmacenados);

  } 


}

export class Producto {
  tipo: string;
  color: string;
  talla: string;
  cantidad: number;
  modelo: string;

constructor(tipo: string, color: string, talla: string, cantidad:number, modelo: string) {
    this.tipo = tipo;
    this.color = color;
    this.talla = talla;
    this.cantidad = cantidad;
    this.modelo = modelo;
  }
}

