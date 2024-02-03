import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsComponent } from './components/components.component';
import { TrainListComponent } from './components/train-list/train-list.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    TrainListComponent,
    CustomerInfoComponent,
    HomeComponent,
    AboutComponent,
    NavBarComponent,
    FooterComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
