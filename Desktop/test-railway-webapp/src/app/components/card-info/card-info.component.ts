import { NgForm } from '@angular/forms';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {
  
  customerInfo: any;
  seatInfo: any;
  from:any;
  to:any;
 

  constructor(private sharedDataService: SharedDataService,private router: Router) {}

  ngOnInit(): void {
    this.sharedDataService.customerInfo$.subscribe((customerInfo) => {
      this.customerInfo = customerInfo;
    });

    this.sharedDataService.seatInfo$.subscribe((seatInfo) => {
      this.seatInfo = seatInfo;
    });

    this.sharedDataService.from$.subscribe((from)=>{
    this.from=from
    })
    this.sharedDataService.to$.subscribe((to)=>{
    this.to=to
    })
  }
  formSubmitHandler(form: NgForm) {
    
    this.router.navigate(['/pdf']);
  }
}