import { Component } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { Producto } from '../../models/producto';

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

  constructor(){
    this.setArrayActual();
    this.buscarProductos();
    this.obtenerPropiedades();

  }

  setArrayActual(){
    if(this.nombreArray === 'productosVirgenes'){

      this.arrayActual = JSON.parse(localStorage.getItem('productosVirgenes')!)

    }else{

      this.arrayActual = JSON.parse(localStorage.getItem('productosFabricados')!)
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

  //obtener array que corresponda
  //buscar categoria en el array
  //obtener nombres de propiedades
  //mostrar elementos

}
