import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBar } from "./components/nav-bar/nav-bar";
import { IonHeader, IonTitle, IonIcon, IonBadge, IonTabBar, IonToolbar, IonContent, IonFooter, IonRouterOutlet } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { notifications} from 'ionicons/icons';
import { Producto } from './models/producto';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, IonHeader, IonTitle, IonIcon, RouterLink, IonBadge, IonTabBar, IonToolbar, IonContent, IonFooter, IonRouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-stock');

  arrayAlertas:Producto[] = []

  //se supone que con esto podré conectarme a la bd
  constructor(private http: HttpClient) {
    addIcons({ notifications});
    this.getArrayAlertas()
    //= JSON.parse(localStorage.getItem('alertasProductos'))

  }

  getArrayAlertas(){
    this.arrayAlertas = JSON.parse(localStorage.getItem('alertasProductos')!)
  }
}
