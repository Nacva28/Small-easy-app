import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { TrainListComponent } from './components/train-list/train-list.component';
import { AvailableListComponent } from './components/available-list/available-list.component';
import { CardInfoComponent } from './components/card-info/card-info.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'customer-info', component: CustomerInfoComponent },
  { path: 'train-list', component: TrainListComponent },
  { path: 'available-list', component: AvailableListComponent },
  { path: 'card-info', component: CardInfoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
