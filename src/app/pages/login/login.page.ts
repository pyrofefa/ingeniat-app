import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AssetsService } from 'src/app/services/assets.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private extras: AssetsService,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.authService.login(this.credentials.value).then(res =>{
      if(res.response == false){
        setTimeout(()=>{
          loading.dismiss();
          this.extras.presentToast(JSON.stringify(res.message));
        },1500);
      }
      else{
        setTimeout(()=>{
          loading.dismiss();
        },1500);
      }
    }).catch(error =>{
      setTimeout(()=>{
        this.extras.presentToast(JSON.stringify(error));
      },1500);
    })
      
  }

  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
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
  register(){
    this.router.navigate(['/register']);
  }

}
