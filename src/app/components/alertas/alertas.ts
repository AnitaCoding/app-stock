import { Component } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonInput, IonContent, IonText, AlertController } from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';
import { ServicioLocalstorage } from '../../services/servicio-localstorage';
import { ServicioAlertas } from '../../services/servicio-alertas';

@Component({
  selector: 'app-alertas',
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonInput, IonContent, IonText],
  templateUrl: './alertas.html',
  styleUrl: './alertas.css',
})
export class Alertas {
  arrayAlertas: Producto[] = []; //esto a lo mejor tendría que ir en constructr o ngoninit
  arrayVirgenes:Producto[] = []
  arrayFabricados: Producto[] = []
  mensajeAlerta:string = 'La cantidad introducida es incorrecta, porque es superior a la que tenías que fabricar'

  constructor(public servicio_localstorage:ServicioLocalstorage, public servicio_alertas:ServicioAlertas){
    this.arrayAlertas = this.servicio_localstorage.getArrayAlertas()
  }

  encuentraProductoVirgen(producto: Producto, c:any){
    if(producto.cantidad < c){
      this.servicio_alertas.mostrarAlerta(this.mensajeAlerta);
    }else{
      this.arrayVirgenes = this.servicio_localstorage.getArrayVirgenes()
      const productoEncontrado = this.arrayVirgenes.find(p =>
        p.tipo === producto.tipo &&
        p.color === producto.color &&
        p.talla === producto.talla
      );
      this.restarProducto(productoEncontrado!, producto, c);
      this.servicio_localstorage.setArrayVirgenes(this.arrayVirgenes)  
      this.encuentraProductoFabricado(producto, c)
      producto.cantidad = c;
      this.encuentraAlerta(producto, c)
    }
  }

  restarProducto(pEncontrado: Producto, pActual:Producto, cInput:number){
    let cantidad = pActual.cantidad - cInput;
    pEncontrado.cantidad -= cantidad

  }

  encuentraAlerta(producto: Producto, c:any){
    const productoEncontrado = this.arrayAlertas.find(p =>
      p.id === producto.id
    );
    this.restarProducto(productoEncontrado!, producto, c);

    if(c == 0){
      this.eliminarProducto(producto)
    }

    this.servicio_localstorage.setArrayAlertas(this.arrayAlertas)

  }

  encuentraProductoFabricado(producto:Producto, c:any){
    this.arrayFabricados = this.servicio_localstorage.getArrayFabricados();

    const productoEncontrado = this.arrayFabricados.find(p =>
      p.id === producto.id
    );
    this.modificarProductoFabricado(productoEncontrado!, producto, c)
    this.servicio_localstorage.setArrayFabricados(this.arrayFabricados)
  }

  modificarProductoFabricado(pEncontrado: Producto, pActual:Producto, cInput:number){
    let cantidad = pActual.cantidad - cInput;
    pEncontrado.cantidad += cantidad
  }

  eliminarProducto(producto: Producto){
    this.arrayAlertas = this.arrayAlertas.filter(p => p.id !== producto.id);
  }
}