import { Component, OnInit } from '@angular/core';
import { IonSearchbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-compraventa',
  imports: [IonSearchbar, IonButton],
  templateUrl: './compraventa.html',
  styleUrl: './compraventa.css',
})
export class Compraventa implements OnInit {

  ngOnInit(): void {
    console.log(localStorage.getItem('valorBotonHome'))
  }
}
