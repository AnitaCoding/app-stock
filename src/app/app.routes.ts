import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { Home } from './components/home/home';
import { IonicModule } from '@ionic/angular';
import { CaracteristicasProducto } from './components/caracteristicas-producto/caracteristicas-producto';
import { NuevoProducto } from './components/nuevo-producto/nuevo-producto';
import { Busqueda } from './components/busqueda/busqueda';
import { FichaProducto } from './components/ficha-producto/ficha-producto';


export const routes: Routes = [
    {path:'home', component:Home},
    {path: 'caracteristicasProducto', component:CaracteristicasProducto},
    {path:'nuevo-producto', component:NuevoProducto},
    {path:'busqueda', component:Busqueda},
    {path: 'ficha-producto', component:FichaProducto}
];
