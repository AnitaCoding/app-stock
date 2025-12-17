import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { Home } from './components/home/home';
import { IonicModule } from '@ionic/angular';
import { Compraventa } from './components/compraventa/compraventa';
import { CaracteristicasProducto } from './components/caracteristicas-producto/caracteristicas-producto';
import { Producto } from './components/producto/producto';
import { NuevoProducto } from './components/nuevo-producto/nuevo-producto';

export const routes: Routes = [
    {path:'home', component:Home},
    {path:'compraventa', component:Compraventa},
    {path: 'caracteristicasProducto', component:CaracteristicasProducto},
    {path:'producto', component: Producto},
    {path:'nuevo-producto', component:NuevoProducto}
];
