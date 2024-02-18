import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainsService } from 'src/app/services/trains.service';

@Component({
  selector: 'app-available-list',
  templateUrl: './available-list.component.html',
  styleUrls: ['./available-list.component.scss'],
})
export class AvailableListComponent implements OnInit {
  fromStation: string = '';
  toStation: string = '';
  availableTrains: any[] = [];
  selectedTrain: any;

  constructor(
    private route: ActivatedRoute,
    private trainsService: TrainsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fromStation = params['from'];
      this.toStation = params['to'];
  
      const dynamicTrainNumbers = [812, 808, 804]; // Replace with your dynamic array
      this.getAvailableTrains(dynamicTrainNumbers);
    });
  }
  
  // ... (existing code)
  
  getAvailableTrains(dynamicTrainNumbers: number[]): void {
    this.trainsService.getTrainAvailable(this.fromStation, this.toStation).subscribe(
      (trains) => {
        console.log('Second API Result:', trains);
        this.availableTrains = trains.filter(
          (train) =>
            train.from === this.fromStation &&
            train.to === this.toStation &&
            dynamicTrainNumbers.includes(train.number)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  redirectToCustomerInfo(train: any) {
    this.router.navigate(['/customer-info'], { state: { train,trainNumber: train.number } });
  }
}
