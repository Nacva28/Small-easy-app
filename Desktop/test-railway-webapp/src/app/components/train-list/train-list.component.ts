import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Stations } from 'src/app/interfaces/stations';
import { StationsService } from 'src/app/services/stations.service';
import { FormDataService } from 'src/app/services/form-data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss'],
})
export class TrainListComponent implements OnInit {
  selectedDate: NgbDate | null = null;
  minDate: NgbDate;
  categoryData: Stations[] = [];
  selectedCategories: { [key: string]: string } = {
    from: '',
    to: '',
  };

  constructor(
    private CategoryStationPlace: StationsService,
    private router: Router,
    private sharedDataService: SharedDataService 
  ) {
    const today = new Date();
    this.selectedDate = new NgbDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
    this.minDate = new NgbDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
  }
  onDateSelectionChange(): void {
    
    console.log('Selected Date:', this.selectedDate);
  }

  redirectToAvailableList(): void {
    this.sharedDataService.setFrom(this.selectedCategories['from']);
    this.sharedDataService.setTo(this.selectedCategories['to']);
    if (
    
      !this.selectedCategories['from'] ||
      !this.selectedCategories['to'] ||
      !(document.getElementById('invalidCheck') as HTMLInputElement)?.checked
      
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all the required fields.',
      });
    } else {
      const queryParams: any = {
        from: this.selectedCategories['from'],
        to: this.selectedCategories['to'],
      };
  
      if (this.selectedDate) {
        queryParams.date = `${this.selectedDate.year}-${this.selectedDate.month}-${this.selectedDate.day}`;
      }
  
      this.router.navigate(['/available-list'], {
        queryParams,
      });
    }
  }
    
  ngOnInit(): void {
    this.CategoryStationPlace.getStationCategories().subscribe((response) => {
      console.log(response);
      this.categoryData = response;
    });
  }
}
