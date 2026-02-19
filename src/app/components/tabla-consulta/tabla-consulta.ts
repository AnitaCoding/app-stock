import { Component } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { Producto } from '../../models/producto';
import { ServicioLocalstorage } from '../../services/servicio-localstorage';

@Component({
  selector: 'app-tabla-consulta',
  imports: [IonContent],
  templateUrl: './tabla-consulta.html',
  styleUrl: './tabla-consulta.css',
})
export class TablaConsulta {

  categoria: string = localStorage.getItem('categoriaConsulta')!;
  nombreArray: string = localStorage.getItem('consulta')!;
  arrayActual: Producto[] = [];
  productosFiltrados: Producto[] = [];
  propiedadesProducto: string[] = []

  constructor(public servicio_localstorage:ServicioLocalstorage){
    this.setArrayActual();
    this.buscarProductos();
    this.obtenerPropiedades();

  }

  setArrayActual(){
    if(this.nombreArray === 'productosVirgenes'){
      this.arrayActual = this.servicio_localstorage.getArrayVirgenes()
    }else{
      this.arrayActual = this.servicio_localstorage.getArrayFabricados()
    }
  }

  buscarProductos(){
    this.productosFiltrados = this.arrayActual.filter(
      producto => producto.tipo === this.categoria,
      )
  }

  obtenerPropiedades(){
    this.propiedadesProducto = Object.keys(this.productosFiltrados[0])
  }
}
