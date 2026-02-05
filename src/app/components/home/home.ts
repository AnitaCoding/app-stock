import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  imports: [IonButton, RouterLink, IonContent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  setValueBoton(value: string){
    let valorBoton = value;
    localStorage.setItem('valorBotonHome',valorBoton);
    
  }

}
