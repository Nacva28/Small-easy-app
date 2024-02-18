
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {
  customerInfo: any;
  seatInfo: any;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.customerInfo$.subscribe((customerInfo) => {
      this.customerInfo = customerInfo;
    });

    this.sharedDataService.seatInfo$.subscribe((seatInfo) => {
      this.seatInfo = seatInfo;
    });
  }
  formSubmitHandler(form: NgForm) {
    // Handle form submission if needed
  }
}
