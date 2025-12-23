import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInput, IonItem, IonList, IonButton, IonText, IonSegment, IonLabel, IonSegmentButton} from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';


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
    id: 0,
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
    this.limpiarInputs();
    
  }

  limpiarInputs(){
    this.nuevoProducto.tipo = '';
    this.nuevoProducto.color = '';
    this.nuevoProducto.talla = '';
    this.nuevoProducto.cantidad = 0;
    this.nuevoProducto.modelo = '';
  }

  guardarProductos(){

    this.arrayProductos.push(this.nuevoProducto);
    this.crearIdProducto();
    console.log(this.nuevoProducto.id);

    if (this.opcionSeleccionada === 'virgen'){
      localStorage.setItem('productosVirgenes', JSON.stringify(this.arrayProductos));
    }else{
      localStorage.setItem('productosFabricados', JSON.stringify(this.arrayProductos));
    }

  }

  //creo un id de producto para que sea más fácil buscarlo en el array que corresponda
  crearIdProducto(){
    this.nuevoProducto.id = this.arrayProductos.length;
    
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



