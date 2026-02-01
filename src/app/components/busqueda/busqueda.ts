import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonSearchbar } from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';
import { ComunicarDatos } from '../../services/comunicar-datos';
import { ComunicarArrayProductos } from '../../services/comunicar-array-productos';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-busqueda',
  imports: [IonSearchbar, IonList,IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, RouterLink, FormsModule ],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda implements OnInit {

  ngOnInit(): void {
    this.elegirArray();
    this.guardarCategorias();
    
  }

  constructor(public servicio_comunicar_datos: ComunicarDatos, public servicio_comunicar_array_productos:ComunicarArrayProductos){
    
    this.productosFiltrados = [...this.arrayProductos];
    
  }

  
  nombreArray: string = '';

  valorBotonHome = localStorage.getItem('valorBotonHome');
  arrayProductos: Producto[] = [];
  terminoBusqueda: string = '';
  listaCategorias: String[] = [];
  productosFiltrados: Producto[] = [];
  productoActual: Producto = new Producto();
 
  //COSAS QUE FALTAN

  //Obtenemos el array que corresponda según la acción que vamos a realizar
  //Comprar, vender, añadir...

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

  //Obtenemos las categorías de los productos del array para crear los botones.
  guardarCategorias(){

    let p = new Producto;

    for (let i = 0; i < this.arrayProductos.length ; i++){
      
      p = this.arrayProductos[i];
      
      if(!this.listaCategorias.includes(p.tipo)){
        this.listaCategorias.push(p.tipo)
      }

    }

  }

  buscarProductos() {

    if(this.valorBotonHome === 'vender' || this.valorBotonHome === 'fabricar'){
      this.buscarPorModelo(this.terminoBusqueda.toLowerCase());

    }else{
      this.buscarPorCategoria(this.terminoBusqueda.toLowerCase());
      
    }

  }

  buscarPorCategoria(palabraBusqueda: string){
       this.productosFiltrados = this.arrayProductos.filter(p =>
      p.tipo.toLowerCase().includes(palabraBusqueda)
    
    );

  }

  //esta función hay que mejorarla por si concateno camiseta con el nombre de modelo en el buscador
  buscarPorModelo(palabraBusqueda: string){
    this.productosFiltrados = this.arrayProductos.filter(p =>
      p.tipo.toLowerCase().includes(palabraBusqueda) || p.modelo.toLowerCase().includes(palabraBusqueda)
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
