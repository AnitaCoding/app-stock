import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ServicioToasts {

  constructor(private toastController:ToastController){}

    async mostrarToast(m:string){
       
    const toast = await this.toastController.create({
      message:m,
      duration: 1500,
      position: 'middle',
    });

    await toast.present();
  }
  
}
