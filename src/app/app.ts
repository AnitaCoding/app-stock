import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./components/nav-bar/nav-bar";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, IonHeader, IonTitle, IonToolbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-stock');

  //se supone que con esto podré conectarme a la bd
  constructor(private http: HttpClient) {}
}
