import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Stations } from 'src/app/interfaces/stations';
import { StationsService } from 'src/app/services/stations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss'],
})
export class TrainListComponent implements OnInit {
  selectedDate: NgbDate | null = null;
  minDate: NgbDate; 
  ticketQuantity: number | null = null;
  categoryData: Stations[] = [];
  selectedCategories: { [key: string]: string } = {};
  validateTicketQuantity(): void {
    const maxTickets = 10;
  
    if (this.ticketQuantity !== null) {
      if (this.ticketQuantity > maxTickets) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You can buy only 10 tickets!',
        });
        this.ticketQuantity = null;
      } else if (this.ticketQuantity <= 0) {
       
        this.ticketQuantity = null;
      }
    }
  }
  constructor(private CategorystationPlace: StationsService) {
    const today = new Date();
    this.selectedDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    this.minDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }

  onCategorySelected(
    event: Event,
    category: Stations,
    dropdownId: string
  ): void {
    event.preventDefault();
    this.selectedCategories[dropdownId] = category.name;
  }
  onDateSelected(date: NgbDate): void {
    this.selectedDate = new NgbDate(date.year, date.month, date.day);
  }
  onNavigate(event: Event): void {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.CategorystationPlace.getStationCategories().subscribe((response) => {
      console.log(response);
      this.categoryData = response;
    });
  }
}