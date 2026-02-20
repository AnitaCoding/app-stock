import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { Home } from './components/home/home';
import { IonicModule } from '@ionic/angular';
import { NuevoProducto } from './components/nuevo-producto/nuevo-producto';
import { Busqueda } from './components/busqueda/busqueda';
import { FichaProducto } from './components/ficha-producto/ficha-producto';
import { Alertas } from './components/alertas/alertas';
import { TablaConsulta } from './components/tabla-consulta/tabla-consulta';
import { SelectorTipoProducto } from './components/selector-tipo-producto/selector-tipo-producto';
import { Estadisticas } from './components/estadisticas/estadisticas';
import { SelectorListasVentas } from './components/selector-listas-ventas/selector-listas-ventas';
import { ListasVentas } from './components/listas-ventas/listas-ventas';


export const routes: Routes = [
    {path:'home', component:Home},
    {path:'nuevo-producto', component:NuevoProducto},
    {path:'busqueda', component:Busqueda},
    {path: 'ficha-producto', component:FichaProducto},
    {path: 'alertas', component:Alertas},
    {path: 'tabla-consulta', component:TablaConsulta},
    {path: 'selector-tipo-producto', component: SelectorTipoProducto},
    {path: 'estadisticas', component: Estadisticas},
    {path: 'selector-listas-ventas', component:SelectorListasVentas},
    {path: 'ilstas-ventas', component: ListasVentas}
];
