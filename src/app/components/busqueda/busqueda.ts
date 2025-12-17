import { Component, OnInit } from '@angular/core';
import { IonItem, IonList, IonSearchbar } from '@ionic/angular/standalone';
import { Producto } from '../producto/producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busqueda',
  imports: [IonSearchbar, IonItem, IonList, CommonModule],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda implements OnInit {

  ngOnInit(): void {
    this.elegirArray();
  }

  constructor(){
    
    this.productosFiltrados = [...this.arrayProductos];
  }

  valorBotonHome = localStorage.getItem('valorBotonHome');
  arrayProductos: Producto[] = [];
  productosFiltrados: Producto[] = []

  elegirArray (){
    let productosAlmacenados;

    if (this.valorBotonHome === 'vender' || this.valorBotonHome === 'fabricar'){
      productosAlmacenados = localStorage.getItem('productosFabricados')!;
    }else{
      productosAlmacenados = localStorage.getItem('productosVirgenes')!;

    }

    this.arrayProductos = JSON.parse(productosAlmacenados);

  }

  buscarProductos(event: any) {
    
    const palabraBusqueda = event.target.value.toLowerCase();

    if (!palabraBusqueda) {
      this.productosFiltrados = [...this.arrayProductos];
      return;
    }

    if(this.valorBotonHome === 'vender' || this.valorBotonHome === 'fabricar'){
      this.buscarPorModelo(palabraBusqueda);

    }else{
      this.buscarPorTipo(palabraBusqueda);
    }
  }

  buscarPorTipo(palabraBusqueda: string){
       this.productosFiltrados = this.arrayProductos.filter(p =>
      p['tipo'].toLowerCase().includes(palabraBusqueda)
    );
      //Esto lo añado si quiero que a la búsqueda se una el color
      //||
      //p['color'].toLowerCase().includes(palabraBusqueda)

      
    //He tenido que acceder a cada propiedad con strings porque si no, me da un error que indica que producto no tiene ni tipo ni color.
    //No lo entiendo, porque sí que los tiene, quizás haya algún problema al almacenar el array
  }

  buscarPorModelo(palabraBusqueda: string){
    this.productosFiltrados = this.arrayProductos.filter(p =>
      p['modelo'].toLowerCase().includes(palabraBusqueda)
    )

  }

}
