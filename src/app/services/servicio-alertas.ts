import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ServicioAlertas {
  constructor(private alertControl:AlertController){

  }

  async mostrarAlerta(m?:string) {

    const alert = await this.alertControl.create({
      header: 'Error',
      message: m,
      buttons: ['Ok'],
    });

    await alert.present();

  } 
  
}
