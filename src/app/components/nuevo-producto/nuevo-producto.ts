import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInput, IonItem, IonList, IonButton, IonText, IonSegment, IonLabel, IonSegmentButton, IonContent, ToastController, AlertController} from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';
import { ServicioLocalstorage } from '../../services/servicio-localstorage';
import { ServicioAlertas } from '../../services/servicio-alertas';
import { ServicioToasts } from '../../services/servicio-toasts';


@Component({
  selector: 'app-nuevo-producto',
  imports: [IonInput, IonItem, IonList, IonButton, IonText, IonSegment, IonLabel, IonSegmentButton, IonContent,
    FormsModule
  ],
  templateUrl: './nuevo-producto.html',
  styleUrl: './nuevo-producto.css',
})

export class NuevoProducto{
  constructor(public servicio_toasts:ServicioToasts, public servicio_alertas:ServicioAlertas, public servicio_localstorage:ServicioLocalstorage){

  }

  opcionSeleccionada: string = 'virgen';

  //array de productos. No hace falta indicar si son vírgenes o no,
  //porque solo trabajaremos un array cada vez

  arrayProductos: Producto[] = []; 
  nuevoProducto= {
    id: 0,
    tipo: '',
    color: '',
    talla: '',
    cantidad: 0,
    modelo: ''
  }

  alertaSinTipo: string = 'No se puede almacenar un producto sin tipo'
  alertaSinModelo: string = 'No se puede almacenar un producto fabricado sin indicar el modelo';
  alertaSinTalla: string = 'No se puede almacenar este producto sin talla'
  alertaDuplicado: string = 'Este producto ya existe en la BD'
  toastGuardar:string = 'Producto añadido'
  toastCancelar: string = 'Acción cancelada'

  botonGuardar(c:string){
    this.obtenerProductos();
    this.guardarProductos(c);
    this.limpiarInputs();   
  }

  botonCancelar(c:string){
    this.limpiarInputs();
    this.servicio_toasts.mostrarToast(this.toastCancelar)
  }

  limpiarInputs(){
    this.nuevoProducto.tipo = '';
    this.nuevoProducto.color = '';
    this.nuevoProducto.talla = '';
    this.nuevoProducto.cantidad = 0;
    this.nuevoProducto.modelo = '';
  }

  existeProducto(){
    const existe = this.arrayProductos.some(p =>
      this.esIgual(p)
      );
      return existe
  }

  //esto debe ir en la clase, pero al ponerlo me salta errores por todas partes, así que de momento lo dejo aquí
  //porque no encuentro forma de quitar todos esos errores

  esIgual(productoComparacion:Producto):boolean{
    return(
      this.nuevoProducto.tipo.toLowerCase() === productoComparacion.tipo.toLowerCase() &&
      this.nuevoProducto.modelo.toLowerCase() === productoComparacion.modelo.toLowerCase() &&
      this.nuevoProducto.color.toLowerCase() === productoComparacion.color.toLowerCase() &&
      this.nuevoProducto.talla.toLowerCase() === productoComparacion.talla.toLowerCase()
    )
  }

  obtenerArrayComparacion(){
    let arrayComparacion: Producto[];
    if( this.opcionSeleccionada === 'virgen'){
      arrayComparacion = this.servicio_localstorage.getArrayVirgenes();
    }else{
      arrayComparacion = this.servicio_localstorage.getArrayFabricados();
    }
    return arrayComparacion
  }

  guardarProductos(c:string){
    if(!this.nuevoProducto.tipo){
      this.servicio_alertas.mostrarAlerta(this.alertaSinTipo);

        if(this.opcionSeleccionada === 'fabricado' && !this.nuevoProducto.modelo){
        this.servicio_alertas.mostrarAlerta(this.alertaSinModelo);

      }else if(this.nuevoProducto.tipo.toLowerCase() === 'camiseta' || this.nuevoProducto.tipo.toLowerCase() === 'sudadera'){

        if(!this.nuevoProducto.talla){
          this.servicio_alertas.mostrarAlerta(this.alertaSinTalla);
        }

      }else if(this.existeProducto()){
        this.servicio_alertas.mostrarAlerta(this.alertaDuplicado)

      }else{
        this.arrayProductos.push(this.nuevoProducto);
        this.crearIdProducto();

        if (this.opcionSeleccionada === 'virgen'){
          this.servicio_localstorage.setArrayVirgenes(this.arrayProductos)
        }else{
          this.servicio_localstorage.setArrayFabricados(this.arrayProductos)
        }
        this.servicio_toasts.mostrarToast(this.toastGuardar)
      }
    }
  }

  crearIdProducto(){
    this.nuevoProducto.id = this.arrayProductos.length;   
  }

  obtenerProductos(){
    if(this.opcionSeleccionada === 'virgen'){
      this.arrayProductos = this.servicio_localstorage.getArrayVirgenes();
    }else{
      this.arrayProductos = this.servicio_localstorage.getArrayFabricados();
    }
  }

  /*****VALIDACIÓN INPUTS******/

}



