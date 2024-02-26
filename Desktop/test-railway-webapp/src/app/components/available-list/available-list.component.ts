import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  selectedDate: NgbDate | null | undefined;
  dayOfWeek: string = '';

  constructor(
    private route: ActivatedRoute,
    private trainsService: TrainsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: string; }) => {
      this.fromStation = params['from'];
      this.toStation = params['to'];
      const dynamicTrainNumbers = [812, 808, 804];
      this.getAvailableTrains(dynamicTrainNumbers, this.fromStation, this.toStation, this.selectedDate||null);
    });
  }
  





  getAvailableTrains(dynamicTrainNumbers: number[], fromStation: string, toStation: string, selectedDate: NgbDate | null): void {
    this.trainsService.getTrainAvailable(fromStation, toStation, selectedDate ?? undefined).subscribe(
      (trains) => {
        console.log('Second API Result:', trains);
        this.availableTrains = trains.filter(
          (train) =>
            train.from === fromStation &&
            train.to === toStation &&
            dynamicTrainNumbers.includes(train.number) &&
            this.trainsService.checkTrainDate(train, selectedDate)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  redirectToCustomerInfo(train: any) {
    this.router.navigate(['/customer-info'], { state: { train, trainNumber: train.number } });
  }
}