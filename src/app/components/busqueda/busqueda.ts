import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonList, IonSearchbar } from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';
import { ComunicarDatos } from '../../services/comunicar-datos';


@Component({
  selector: 'app-busqueda',
  imports: [IonSearchbar, IonItem, IonList,IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, RouterLink ],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda implements OnInit {

  ngOnInit(): void {
    this.elegirArray();
  }

  constructor(public servicio_comunicar_datos: ComunicarDatos){
    
    this.productosFiltrados = [...this.arrayProductos];
  }

  valorBotonHome = localStorage.getItem('valorBotonHome');
  arrayProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productoActual: Producto = new Producto();
 

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
      p.tipo.toLowerCase().includes(palabraBusqueda)
    );
      //Esto lo añado si quiero que a la búsqueda se una el color
      //||
      //p['color'].toLowerCase().includes(palabraBusqueda)
  }

  buscarPorModelo(palabraBusqueda: string){
    this.productosFiltrados = this.arrayProductos.filter(p =>
      p.modelo.toLowerCase().includes(palabraBusqueda)
    )

  }

  //de alguna manera tengo que recoger el producto que se clica, para comunicarlo a través del servicio
  //al componente ficha-producto
    comunicarDatos(tipo:string, color:string, talla:string, cantidad:number, modelo:string){
        this.productoActual.tipo = tipo;
        this.productoActual.color = color;
        this.productoActual.talla = talla;
        this.productoActual.cantidad = cantidad;
        this.productoActual.modelo = modelo;
        this.servicio_comunicar_datos.productoActual = this.productoActual;
        
    }

}
