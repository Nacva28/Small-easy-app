import { SharedDataService } from '../../services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VagonsService } from '../../services/vagons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  showCategories:boolean=false
  selectedTrain: any;
  passengerForm: FormGroup;
  vagonCategories: any;
  selectedCategory!: string;
  seats: any [][] = [];
  firstThreeCategories: any[] = [];
  selectedSeat:any;

  selectSeat(seat: any): void {
    // Reset styles for previously selected seat
    if (this.selectedSeat) {
      this.selectedSeat.isSelected = false;
    }
  
    // Update styles for the newly selected seat
    seat.isSelected = true;
  
    // Update the selected seat property
    this.selectedSeat = seat;
  }

  constructor(private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private vagonsService: VagonsService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    if (state) {
      this.selectedTrain = state['train'];
      const trainNumber: any = state['trainNumber'];
      this.loadVagonCategories(trainNumber);
    } else {
      // Handle case when no state is available
    }

    this.passengerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      personalNumber: ['', Validators.required],
    });
  }

  

  loadVagonCategories(trainNumber: number): void {
    this.vagonsService.getVagonCategories().subscribe(
      (data) => {
        this.vagonCategories = data.filter(
          (category: { trainNumber: number }) =>
            category.trainNumber === trainNumber
        );
        console.log(this.vagonCategories);
      },
      (error) => {
        console.log('Error loading vagon categories:', error);
      }
    );
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.seats = this.generateSeatsGrid(category);
  }
  showWagonCategories(): void {
    
    if (!this.vagonCategories) {
      const trainNumber: any = this.selectedTrain?.number;
      this.loadVagonCategories(trainNumber);
    }

    
    this.showCategories = !this.showCategories;
  }


  loadSeatsForCategory(category: any): void {
    this.selectedCategory = category.name;
    this.seats = this.generateSeatsGrid(category.name);
 
  }
  generateSeatsGrid(category: string): any[][] {
    const rows = 4; 
    const seatsPerRow = 10;
  
    const selectedCategory = this.vagonCategories.find((categoryData: any) => categoryData.name === category);
  
    if (selectedCategory && selectedCategory.seats) {
      const processedSeats = selectedCategory.seats;
  
      const seatsGrid = Array.from({ length: rows }, (_, rowIndex) => {
        return Array.from({ length: seatsPerRow }, (_, seatIndex) => {
          const seatNumber = processedSeats[rowIndex * seatsPerRow + seatIndex]?.number;
  
          if (seatNumber) {
            const seatId = `seats-${rowIndex + 1}-${seatIndex + 1}`;
            const isOccupied = processedSeats.some((seat: any) => seat.number === seatNumber);
            let price =1;
            if (selectedCategory.name === 'II კლასი') {
              price = 75;
            } else if (selectedCategory.name === 'I კლასი') {
              price = 35;
            } else if (selectedCategory.name === 'ბიზნესი') {
              price = 125;
            }

            return {
              seatId,
              number: seatNumber,
              price,
              isOccupied,
              vagonId: selectedCategory.vagonId,
            };
          } else {
            return null;
          }
        });
      });
  
      return seatsGrid.filter(row => row); 
    } else {
      console.error('Selected category not found or seats not available for the category:', category);
      return [];
    }
  }
  ngOnInit(): void {
    this.restoreCustomerAndSeatInfo();
  }

  chooseSeat(): void {
    if (this.passengerForm.valid) {
     
      const selectedSeatCategory = this.getSelectedSeatCategory();

      if (selectedSeatCategory) {
        this.selectedCategory = selectedSeatCategory;
        this.seats = this.generateSeatsGrid(selectedSeatCategory);


        this.saveCustomerAndSeatInfo();
      } else {
        
      }
    }
  }

  private getSelectedSeatCategory(): string | null {
    
    return null;
  }

  

redirectToCardInfo(): void {
  if (!this.passengerForm.valid || !this.selectedSeat) {
    // Display a SweetAlert message
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all required information and choose a seat!',
    });
    return; // Do not proceed with redirect
  }
  this.saveCustomerAndSeatInfo();

    this.router.navigate(['/card-info']);
  }

  private saveCustomerAndSeatInfo(): void {
    const customerInfo = {
      name: this.passengerForm.value.name,
      surname: this.passengerForm.value.surname,
      personalNumber: this.passengerForm.value.personalNumber,
    };

    const seatInfo = {
      seatNumber: this.selectedSeat.number,
      price: this.selectedSeat.price,
    };

    this.sharedDataService.setCustomerInfo(customerInfo);
    this.sharedDataService.setSeatInfo(seatInfo);

    // Store data in localStorage
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    localStorage.setItem('seatInfo', JSON.stringify(seatInfo));
  }

  private restoreCustomerAndSeatInfo(): void {
    // Retrieve data from localStorage
    const storedCustomerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
    const storedSeatInfo = JSON.parse(localStorage.getItem('seatInfo') || '{}');

    if (storedCustomerInfo) {
      this.passengerForm.patchValue(storedCustomerInfo);
    }

    if (storedSeatInfo) {
      // Find and set the selected seat in the seats array
      // You'll need to adapt this logic based on your data structure
      const selectedSeat = this.seats.flat().find((seat: any) => seat.number === storedSeatInfo.seatNumber);

      if (selectedSeat) {
        this.selectedSeat = selectedSeat;
        selectedSeat.isSelected = true;
      }
    }
  }
}
