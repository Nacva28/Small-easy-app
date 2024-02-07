import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrainListComponent } from './components/train-list/train-list.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AvailableListComponent } from './components/available-list/available-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainListComponent,
    CustomerInfoComponent,
    HomeComponent,
    AboutComponent,
    NavBarComponent,
    FooterComponent,
    AvailableListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
