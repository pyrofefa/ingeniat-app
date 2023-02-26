import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  toast: any;
  loading: any;

  constructor(public toastCtr: ToastController, public loadingController: LoadingController, public alert: AlertController ) { }

  /**Mensajes de guardado  */
  async presentToast(text:string){
    this.toast = await this.toastCtr.create({
        message: text,
        duration: 2000,
        position: 'middle',
        cssClass: 'customToastClass'
      });
      return this.toast.present();
  }
  /**Mensajes de cargando */
  async cargandoMessage(text:string){
    this.loading = await this.loadingController.create({
      message: text,
      duration : 120000
    });
    return this.loading.present();
  }
  async dismiss(){
    return this.loading.dismiss();
  }
}