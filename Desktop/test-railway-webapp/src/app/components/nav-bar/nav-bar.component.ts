import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(private router: Router) {}

  checkTicket() {
    // Get the entered ticket number from the input (you might want to use ngModel or form controls)
    const ticketNumber = 'Get it from the input'; // Replace with actual value
  
    // Check if the ticket exists or perform delete action
    // You need to implement the logic based on your application's requirements
  
    // For demonstration, let's navigate to the ticket-status page with the ticket number as a route parameter
    this.router.navigate(['/ticket-status', ticketNumber]);
  }
}