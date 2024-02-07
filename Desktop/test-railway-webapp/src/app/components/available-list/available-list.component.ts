import { Component, OnInit } from '@angular/core';
import { Trains } from 'src/app/interfaces/trains';
import { TrainsService } from 'src/app/services/trains.service'; 

@Component({
  selector: 'app-available-list',
  templateUrl: './available-list.component.html',
  styleUrls: ['./available-list.component.scss']
})
export class AvailableListComponent implements OnInit {
  categoryList: Trains[] = [];

  constructor(private trainsService: TrainsService) {} 

  ngOnInit(): void {
    this.trainsService.getTrainAvailable().subscribe((response: Trains[]) => {
      console.log(response);
      this.categoryList = response;
    });
  }
}