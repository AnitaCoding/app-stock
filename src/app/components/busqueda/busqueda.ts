import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonSearchbar } from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';
import { ComunicarDatos } from '../../services/comunicar-datos';
import { ComunicarArrayProductos } from '../../services/comunicar-array-productos';


@Component({
  selector: 'app-busqueda',
  imports: [IonSearchbar, IonList,IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, RouterLink ],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda implements OnInit {

  ngOnInit(): void {
    this.elegirArray();
  }

  constructor(public servicio_comunicar_datos: ComunicarDatos, public servicio_comunicar_array_productos:ComunicarArrayProductos){
    
    this.productosFiltrados = [...this.arrayProductos];
  }

  nombreArray = '';

  valorBotonHome = localStorage.getItem('valorBotonHome');
  arrayProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productoActual: Producto = new Producto();
 

  elegirArray (){
    let productosAlmacenados;

    if (this.valorBotonHome === 'vender' || this.valorBotonHome === 'fabricar'){
      this.nombreArray = 'productosFabricados';
      productosAlmacenados = localStorage.getItem('productosFabricados')!;
    }else{
      this.nombreArray = 'productosVirgenes';
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

  //Utilizamos el servicio comunicarDatos para pasar los datos del producto a la ficha
    comunicarDatos(id: number, tipo:string, color:string, talla:string, cantidad:number, modelo:string){
        this.productoActual.id = id;
        this.productoActual.tipo = tipo;
        this.productoActual.color = color;
        this.productoActual.talla = talla;
        this.productoActual.cantidad = cantidad;
        this.productoActual.modelo = modelo;
        this.servicio_comunicar_datos.productoActual = this.productoActual;
        this.comunicarNombreArrayProductos();
        
    }

    //Utilizamos el servicio comunicarArrayProductos para pasar los datos del producto a la ficha, por si hay que guardar algo nuevo del producto después
    //para saber en qué array hay que buscar
    comunicarNombreArrayProductos(){
      this.servicio_comunicar_array_productos.nombreArrayProductos = this.nombreArray;

    }

}
