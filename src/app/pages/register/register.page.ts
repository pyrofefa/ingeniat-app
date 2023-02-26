import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AssetsService } from 'src/app/services/assets.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user:any;
  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(private back: Router, private auth: AuthenticationService, private extras: AssetsService,private loadingController: LoadingController ) {
     
    this.user = {
      firstname : null, 
      lastname : null, 
      birthdate : null,
      email : null,
      password : null
    }

  }

  ngOnInit() {
  }

  atras(){
    this.back.navigate(['/login' ]);
  }

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.auth.register(this.user).then(res =>{
      if(res.response == false){
        setTimeout(()=>{
          loading.dismiss();
          this.extras.presentToast(JSON.stringify(res.message));
        },1500);
      }
      else{
        setTimeout(()=>{
          loading.dismiss();
          this.extras.presentToast(JSON.stringify(res.message));
          this.back.navigate(['/login' ]);
        },1500);
      }
    }).catch(error =>{
      this.extras.presentToast(JSON.stringify(error.message));
    })
  }

  togglePassword():void {
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye'){
        this.passwordToggleIcon = 'eye-off';
    }
    else{
      this.passwordToggleIcon = 'eye';
    }
  }

}
