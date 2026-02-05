import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonSearchbar, IonContent } from '@ionic/angular/standalone';
import { Producto } from '../../models/producto';
import { Router, RouterLink } from '@angular/router';
import { ComunicarDatos } from '../../services/comunicar-datos';
import { ComunicarArrayProductos } from '../../services/comunicar-array-productos';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-busqueda',
  imports: [IonSearchbar, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, RouterLink, FormsModule, IonContent],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda implements OnInit {

  ngOnInit(): void {
    this.elegirArray();
    this.buscarCategorias();
    
  }

  constructor(private router: Router, 
    public servicio_comunicar_datos: ComunicarDatos, public servicio_comunicar_array_productos:ComunicarArrayProductos){
        
  }

  
  nombreArray: string = '';

  valorBotonHome = localStorage.getItem('valorBotonHome');
  arrayProductos: Producto[] = [];
  terminoBusqueda: string = '';
  listaPropiedades: String[] = [];
  productosFiltrados: Producto[] = [];
  productoActual: Producto = new Producto();
  destinoCard: string = ''; //con esta variable manejamos qué es la siguiente pantalla que va a ver el usuario.
  categoriaElegida: String|null = null;
  buscaPropiedad: boolean= false;
  modeloElegido: String|null = null;
  colorElegido: String|null = null
  buscaTalla: boolean = false;
  estadoActual:string = '';
  tallaElegida: String|null = null

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
  buscarCategorias(){
    let p = new Producto;
    for (let i = 0; i < this.arrayProductos.length ; i++){     
      p = this.arrayProductos[i];    
      if(!this.listaPropiedades.includes(p.tipo)){
        this.listaPropiedades.push(p.tipo)
      }
    }
  }

  buscarProductos() {

    /*Utilizamos .trim para eliminar los espacio de delante y detrás de la cadena terminoBusqueda
    .split para dividirlos en un array (palabras)
    /\s+/ es una expresión regular de space
    si quiero añadir más parámetros de búsqueda, añado más "||"
    
    Puedo añadir campos toLowerCase a la plantilla del objeto, para que no haya que hacer toLowerCase() cada vez, por ejemplo:
    producto.tipoLower y almacenar ahí el tipo en lower case*/


    const palabras = this.terminoBusqueda.toLowerCase().trim().split(/\s+/)

    this.productosFiltrados = this.arrayProductos.filter(p =>
      palabras.every(palabra =>
        p.tipo.toLowerCase().includes(palabra) ||
        p.modelo.toLowerCase().includes(palabra)
      )
    )
  }

  buscarModelos(cat:String){
    this.categoriaElegida = cat;

    const productosEncontrados = this.arrayProductos.filter(
    producto => producto.tipo === cat,
    )    
    this.navegacionBusqueda(productosEncontrados)
    let p = new Producto;
    this.listaPropiedades = [];
    for (let i = 0; i < this.productosFiltrados.length ; i++){
      
      p = this.productosFiltrados[i];
      
      if(p.modelo){  
        if(!this.listaPropiedades.includes(p.modelo)){
          this.listaPropiedades.push(p.modelo)        
        }
      }else{
        this.buscarColores('');
      }
    }  
    this.productosFiltrados = productosEncontrados;
  }

  buscarColores(mod: String){
    this.modeloElegido = mod;
    const productosEncontrados= this.productosFiltrados.filter(
      producto => producto.modelo === mod

    )
    this.navegacionBusqueda(productosEncontrados)
    let p = new Producto;
    this.listaPropiedades = [];

    for (let i = 0; i < this.productosFiltrados.length ; i++){
      
      p = this.productosFiltrados[i];
      
      if(p.color){       
        if(!this.listaPropiedades.includes(p.color)){
          this.listaPropiedades.push(p.color)
        }
      }else{
        this.buscarTallas('');
      }
    }
    this.productosFiltrados = productosEncontrados;
  }

  buscarTallas(col: String){
    this.colorElegido = col;
    const productosEncontrados= this.productosFiltrados.filter(
      producto => producto.color === col
    )

    console.log(productosEncontrados)
    this.navegacionBusqueda(productosEncontrados)
    let p = new Producto;
    this.listaPropiedades = [];
    this.buscaTalla = true;

    for (let i = 0; i < this.productosFiltrados.length ; i++){
      
      p = this.productosFiltrados[i];
      
      if (p.talla){
        if(!this.listaPropiedades.includes(p.talla)){
          this.listaPropiedades.push(p.talla)        
        }
      }
    }
    this.productosFiltrados = productosEncontrados;
  }

  mostrarProducto(t:String){
    this.tallaElegida = t;
    const productosEncontrados= this.productosFiltrados.filter(
      producto => producto.talla === t
    )
    this.navegacionBusqueda(productosEncontrados)

  }

  navegacionBusqueda(productosEncontrados: Array<Producto>){

    if (productosEncontrados.length === 1) { //Este será el caso de productos vírgenes sin modelo, ni color, ni talla
      this.productoActual.id = productosEncontrados[0].id;
      this.productoActual.tipo = productosEncontrados[0].tipo;
      this.productoActual.modelo = productosEncontrados[0].modelo;
      this.productoActual.color = productosEncontrados[0].color;
      this.productoActual.talla = productosEncontrados[0].talla;
      this.productoActual.cantidad =productosEncontrados[0].cantidad;
      this.comunicarDatos(this.productoActual.id, this.productoActual.tipo, this.productoActual.color, this.productoActual.talla, this.productoActual.cantidad, this.productoActual.modelo)
      this.router.navigate(['/ficha-producto']);
    } else if (productosEncontrados.length > 1) {
      this.router.navigate(['/busqueda'])
      this.buscaPropiedad = true;
      this.productosFiltrados = productosEncontrados;
      console.log('los productos filtrados son ' + this.productosFiltrados)
    }
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
