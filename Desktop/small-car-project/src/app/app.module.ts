import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeedComponent } from './components/feed/feed.component';
import { FormsModule } from '@angular/forms';
import { CarInfoComponent } from './components/car-info/car-info.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'feed/:id',
    component: CarInfoComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    NavbarComponent,
    FooterComponent,
    FeedComponent,
    CarInfoComponent,
    
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
