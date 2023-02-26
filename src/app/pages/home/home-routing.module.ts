import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, PipesModule],
})
export class HomePageRoutingModule {}
