import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarData } from 'src/app/interfaces/car-data';
import { CarsDataService } from 'src/app/services/cars-data.service';
@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
})
export class CarInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private carDataService: CarsDataService
  ) {}

  carId: null | number = null;
  carDetails: CarData | undefined = undefined;
  ngOnInit(): void {
    this.carId = +this.route.snapshot.params['id'];
    const currentCar = this.carDataService.carList.find(
      (car) => car.id === this.carId
    );
    this.carDetails = currentCar;
  }
}
