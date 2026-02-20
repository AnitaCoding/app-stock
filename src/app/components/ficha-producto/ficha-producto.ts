import { Component } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, AlertController, ToastController, IonContent, IonCardSubtitle, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ComunicarDatos } from '../../services/comunicar-datos';
import { Producto } from '../../models/producto';
import { ComunicarArrayProductos } from '../../services/comunicar-array-productos';
import { FormsModule } from '@angular/forms';
import { trash } from 'ionicons/icons';
import { ServicioLocalstorage } from '../../services/servicio-localstorage';
import { ServicioAlertas } from '../../services/servicio-alertas';
import { ServicioToasts } from '../../services/servicio-toasts';

@Component({
  selector: 'app-ficha-producto',
  imports: [IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonInput, FormsModule, IonContent, IonCardSubtitle, IonSelectOption, IonSelect],
  templateUrl: './ficha-producto.html',
  styleUrl: './ficha-producto.css',
})
export class FichaProducto {

  productoActual: Producto;
  arrayActual: Producto[] = [];
  arrayVirgenes: Producto[] = [];
  arrayAlertas:Producto[] = [];

  mensajeVender = 'Si estás vendiendo este producto, no puede aumentar el stock :(';
  mensajeComprarFabricar = 'Si estás fabricando o comprando este producto, no puede disminuir el stock :('
  mensajeCambiosGuardados = 'Cambios guardados'
  mensajeCambiosNoGuardados = 'Los cambios no se han guardado'

   constructor(
    public servicio_comunicar_datos: ComunicarDatos, public servicio_comunicar_nombre_array:ComunicarArrayProductos, 
    public servicio_alertas:ServicioAlertas, public servicio_toasts:ServicioToasts, public servicio_localstorage:ServicioLocalstorage){

      this.productoActual = this.servicio_comunicar_datos.productoActual;

   }

    valorBotonHome = localStorage.getItem('valorBotonHome');

   //Para guardar cambio, primero buscamos por id el producto en el array que sea
   //Para saber en qué array hay que buscar, habrá que comunicarlo con un servicio

  guardarCambios(){

    //valorar meter este if gigante en una función manejarCambios, a la que se llame dentro de esta
    this.seleccionarArray();
    let i = 0;
    let cantidad = 0;
    i = this.arrayActual.findIndex(p => p.id === this.productoActual.id)!;
    if(i!== -1){
      if(this.valorBotonHome==='vender' && this.arrayActual[i].cantidad > this.productoActual.cantidad){
        cantidad = this.arrayActual[i].cantidad;
        this.arrayActual[i].cantidad = this.productoActual.cantidad;
        this.setArrayModificado();
        this.servicio_toasts.mostrarToast(this.mensajeCambiosGuardados);
        this.incluirAlerta(cantidad);

      }else if(this.valorBotonHome==='vender' && this.arrayActual[i].cantidad < this.productoActual.cantidad){
        this.servicio_alertas.mostrarAlerta(this.mensajeVender);
        this.productoActual.cantidad = this.arrayActual[i].cantidad;

      } else if(this.valorBotonHome==='fabricar' || this.valorBotonHome==='comprar' && this.arrayActual[i].cantidad < this.productoActual.cantidad){
        
        cantidad = this.arrayActual[i].cantidad;
        this.arrayActual[i].cantidad = this.productoActual.cantidad;
        this.setArrayModificado();
        this.servicio_toasts.mostrarToast(this.mensajeCambiosGuardados);

        if(this.valorBotonHome === 'fabricar'){
                this.buscarProductoVirgen(cantidad);
        }

      }else if(this.valorBotonHome==='fabricar'||this.valorBotonHome==='comprar' && this.arrayActual[i].cantidad > this.productoActual.cantidad ){
        
        this.servicio_alertas.mostrarAlerta(this.mensajeComprarFabricar);
        this.productoActual.cantidad = this.arrayActual[i].cantidad;
        
      }
    }
  }

  seleccionarArray(){
    this.arrayActual = this.servicio_localstorage.getArrayProductos(this.servicio_comunicar_nombre_array.nombreArrayProductos)
  }

  setArrayModificado(){
    this.servicio_localstorage.setArrayProductos(this.servicio_comunicar_nombre_array.nombreArrayProductos, this.arrayActual)
  }
  
  incluirAlerta(c:number){
    this.arrayAlertas = this.servicio_localstorage.getArrayAlertas()
    this.buscarAlerta(c);
  }
  
  buscarAlerta(c:number){
    let producto = this.arrayAlertas.find(
      p => p.id === this.productoActual.id
    );

    if (!producto) {
      producto = {
        id: this.productoActual.id,
        tipo: this.productoActual.tipo,
        modelo: this.productoActual.modelo,
        color: this.productoActual.color,
        talla: this.productoActual.talla,
        cantidad: 0
      };
      
      this.arrayAlertas.push(producto);    
  }
      this.restarVendido(c, producto);    
      this.servicio_localstorage.setArrayAlertas(this.arrayAlertas)
    
  }

  restarVendido(c:number, p:Producto){
    let cantidadVendida = c - this.productoActual.cantidad;
    p.cantidad += cantidadVendida
  }

  buscarProductoVirgen(c:number){
    this.arrayVirgenes = this.servicio_localstorage.getArrayVirgenes();
    const productoEncontrado = this.arrayVirgenes.find(p =>
      p.tipo === this.productoActual.tipo &&
      p.color === this.productoActual.color &&
      p.talla === this.productoActual.talla
  );
    this.restarVirgen(c, productoEncontrado!)
    this.servicio_localstorage.setArrayVirgenes(this.arrayVirgenes)
  }

  restarVirgen(c: number, p: Producto){
    let cantidadFabricada = this.productoActual.cantidad-c;
    p.cantidad -= cantidadFabricada;
  }
  
  cancelarCambios(){
    this.seleccionarArray();
    let i = 0;

    i = this.arrayActual.findIndex(p => p.id === this.productoActual.id)!;

    if(i!== -1){
      this.productoActual.cantidad = this.arrayActual[i].cantidad;
      this.servicio_toasts.mostrarToast(this.mensajeCambiosNoGuardados)
     
    }
  }

  /*****ELIMINAR PRODUCTOS ******/

  eliminarProducto(){
    this.seleccionarArray();
    this.arrayActual = this.arrayActual.filter(p => p.id !== this.productoActual.id);
    this.setArrayModificado()
    
  }
}
