import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AssetsService } from 'src/app/services/assets.service';
import { CarsService } from 'src/app/services/cars.service';
import { IonInfiniteScrollContent } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items = [];
  search = '';
  page = 1;

  constructor(public cars: CarsService, public extras: AssetsService, public alertController: AlertController) { }

  ngOnInit() {
    this.getCars();
  }

  handleRefresh(event) {
    this.page = 1;
    this.items = [];
    setTimeout(() => {
      this.getCars();
      event.target.complete();
    }, 2000);
  };

  onIonInfinite(event) {
    this.page = this.page + 1;
    this.cars.getCarts(this.page).then(res =>{
      for(let cars of res.data.resultados){
        this.items.push(cars);
      }
      event.target.complete();
    }).catch(error =>{
      this.extras.presentToast(JSON.stringify(error.message));
    })
    
  }

  getCars() {
    this.cars.getCarts(this.page).then(res =>{
      for(let cars of res.data.resultados){
        this.items.push(cars);
      }
    }).catch(error =>{
      this.extras.presentToast(JSON.stringify(error.message));
    })
  } 
  searchCars(event){
    this.search = event.detail.value;
  }
}