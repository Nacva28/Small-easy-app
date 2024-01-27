import { Component } from '@angular/core';
import { CarsDataService } from 'src/app/services/cars-data.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
constructor(public carsDataService:CarsDataService){}
}
