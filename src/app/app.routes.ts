import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { Home } from './components/home/home';
import { IonicModule } from '@ionic/angular';
import { CaracteristicasProducto } from './components/caracteristicas-producto/caracteristicas-producto';
import { Producto } from './components/producto/producto';
import { NuevoProducto } from './components/nuevo-producto/nuevo-producto';
import { Busqueda } from './components/busqueda/busqueda';


export const routes: Routes = [
    {path:'home', component:Home},
    {path: 'caracteristicasProducto', component:CaracteristicasProducto},
    {path:'producto', component: Producto},
    {path:'nuevo-producto', component:NuevoProducto},
    {path:'busqueda', component:Busqueda}
];
