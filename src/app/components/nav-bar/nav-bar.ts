import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonFooter, IonIcon, IonToolbar, IonButton, IonButtons} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { statsChart, home, storefront, logoEuro } from 'ionicons/icons';
@Component({
  selector: 'app-nav-bar',
  imports: [IonFooter, IonToolbar, IonIcon, IonButton, IonButtons, RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor() {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ logoEuro, storefront, statsChart, home});
  }

}

