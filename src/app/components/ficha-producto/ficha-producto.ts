import { Component } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, AlertController, ToastController, IonContent } from '@ionic/angular/standalone';
import { ComunicarDatos } from '../../services/comunicar-datos';
import { Producto } from '../../models/producto';
import { ComunicarArrayProductos } from '../../services/comunicar-array-productos';
import { FormsModule } from '@angular/forms';
//import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ficha-producto',
  imports: [IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonInput, FormsModule, IonContent],
  templateUrl: './ficha-producto.html',
  styleUrl: './ficha-producto.css',
})
export class FichaProducto {

  productoActual: Producto;
  arrayActual: Producto[] = [];
  arrayVirgenes: Producto[] = [];
  arrayAlertas:Producto[] = [];

   constructor(
    public servicio_comunicar_datos: ComunicarDatos, public servicio_comunicar_nombre_array:ComunicarArrayProductos,
     private alertCtrl:AlertController, private toastController: ToastController){

      this.productoActual = this.servicio_comunicar_datos.productoActual;

   }

   //este código se repite en varios componentes, valorar gestionarlo con un servicio
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
        this.mostrarToast('middle');
        this.incluirAlerta(cantidad);

      }else if(this.valorBotonHome==='vender' && this.arrayActual[i].cantidad < this.productoActual.cantidad){
        this.mostrarAlerta();
        this.productoActual.cantidad = this.arrayActual[i].cantidad
      } else if(this.valorBotonHome==='fabricar' || this.valorBotonHome==='comprar' && this.arrayActual[i].cantidad < this.productoActual.cantidad){
        cantidad = this.arrayActual[i].cantidad;
        this.arrayActual[i].cantidad = this.productoActual.cantidad;
        this.setArrayModificado();
        this.mostrarToast('middle');
        if(this.valorBotonHome === 'fabricar'){
                this.buscarProductoVirgen(cantidad);
        }
      }else if(this.valorBotonHome==='fabricar'||this.valorBotonHome==='comprar' && this.arrayActual[i].cantidad > this.productoActual.cantidad ){
        this.mostrarAlerta();
        this.productoActual.cantidad = this.arrayActual[i].cantidad
      }
    }
  }

   seleccionarArray(){
    this.arrayActual = JSON.parse(localStorage.getItem(this.servicio_comunicar_nombre_array.nombreArrayProductos)!);

   }

   setArrayModificado(){
    localStorage.setItem(this.servicio_comunicar_nombre_array.nombreArrayProductos, JSON.stringify(this.arrayActual));
    
   }

   setArrayAlertas(){
    localStorage.setItem('alertasProductos', JSON.stringify(this.arrayAlertas));
   }

   seleccionarArrayVirgenes(){
    this.arrayVirgenes = JSON.parse(localStorage.getItem('productosVirgenes')!)
   }

  setArrayVirgenes(){
    localStorage.setItem('productosVirgenes', JSON.stringify(this.arrayVirgenes));

  }
  
  obtenerArrayAlertas(){
    this.arrayAlertas = JSON.parse(localStorage.getItem('alertasProductos')!);
  }

  incluirAlerta(c:number){
    this.obtenerArrayAlertas();
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
    console.log(this.arrayAlertas);
    this.restarVendido(c, producto);
    this.setArrayAlertas();
  }

  restarVendido(c:number, p:Producto){
    let cantidadVendida = c - this.productoActual.cantidad;
    p.cantidad += cantidadVendida
  }

  buscarProductoVirgen(c:number){
    this.seleccionarArrayVirgenes();
    const productoEncontrado = this.arrayVirgenes.find(p =>
      p.tipo === this.productoActual.tipo &&
      p.color === this.productoActual.color &&
      p.talla === this.productoActual.talla
  );
    this.restarVirgen(c, productoEncontrado!)
    this.setArrayVirgenes();
  }

  restarVirgen(c: number, p: Producto){
    let cantidadFabricada = this.productoActual.cantidad-c;
    p.cantidad -= cantidadFabricada;
  }

    async mostrarAlerta() {
    const mensajeVender = 'Si estás vendiendo este producto, no puede aumentar el stock :(';
    const mensajeComprarFabricar = 'Si estás fabricando o comprando este producto, no puede disminuir el stock :('
    if(this.valorBotonHome==='vender'){
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: mensajeVender,
        buttons: ['Ok'],
      });

    await alert.present();
      
    }else{      
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: mensajeComprarFabricar,
        buttons: ['Ok'],
      });

      await alert.present();
    }
  }

  async mostrarToast(position: "top" | "bottom" | "middle" | undefined){
       
    const toast = await this.toastController.create({
      message: 'Cambios guardados',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
  
  async cancelarCambios(position: "top" | "bottom" | "middle" | undefined){
    this.seleccionarArray();
    let i = 0;

    i = this.arrayActual.findIndex(p => p.id === this.productoActual.id)!;

    if(i!== -1){
      this.productoActual.cantidad = this.arrayActual[i].cantidad;
      const toast = await this.toastController.create({
        message: 'Los cambios no se han guardado',
        duration: 1500,
        position: position,
      });
      
      await toast.present();
      
    }
  }
}
