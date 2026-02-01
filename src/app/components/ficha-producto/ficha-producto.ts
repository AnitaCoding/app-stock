import { Component } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { ComunicarDatos } from '../../services/comunicar-datos';
import { Producto } from '../../models/producto';
import { ComunicarArrayProductos } from '../../services/comunicar-array-productos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ficha-producto',
  imports: [IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonInput, FormsModule],
  templateUrl: './ficha-producto.html',
  styleUrl: './ficha-producto.css',
})
export class FichaProducto {

  productoActual: Producto;
  arrayActual: Producto[] = [];

   constructor(public servicio_comunicar_datos: ComunicarDatos, public servicio_comunicar_nombre_array:ComunicarArrayProductos){
      this.productoActual = this.servicio_comunicar_datos.productoActual;

   }

   //este código se repite en varios componentes, valorar gestionarlo con un servicio
    valorBotonHome = localStorage.getItem('valorBotonHome');

   //Para guardar cambio, primero buscamos por id el producto en el array que sea
   //Para saber en qué array hay que buscar, habrá que comunicarlo con un servicio
   //Al comunicar el array, podemos usarlo también para cuando el usuario le de a salir o cancelar
  
   modificarProductoPorId(){
    this.seleccionarArray();
    let i = 0;

    i = this.arrayActual.findIndex(p => p.id === this.productoActual.id)!;

    if(i!== -1){

      this.arrayActual[i].cantidad = this.productoActual.cantidad;
      
      this.setArrayModificado();

    }
   }

   seleccionarArray(){
    this.arrayActual = JSON.parse(localStorage.getItem(this.servicio_comunicar_nombre_array.nombreArrayProductos)!);

   }

   setArrayModificado(){
    localStorage.setItem(this.servicio_comunicar_nombre_array.nombreArrayProductos, JSON.stringify(this.arrayActual));
    
   }

   //Cuando accionamos el botón guardar:
    guardarCambios(){
      this.modificarProductoPorId();
   }

}
