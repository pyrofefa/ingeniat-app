import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public logout: AuthenticationService, private route: Router, public alertController: AlertController) { }


  ngOnInit() {}

  cerrarSesion(){
    this.presentAlert();   
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar sesión ',
      message: '¿Estás seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cerrar sesion');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.logout.logout().then(()=>{
              this.route.navigate(['login']);
            }).catch(error =>{
              console.log(error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
