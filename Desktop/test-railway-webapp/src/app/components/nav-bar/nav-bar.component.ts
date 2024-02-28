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
   
    const ticketNumber = 'Get it from the input'; 
  
    
    this.router.navigate(['/ticket-status', ticketNumber]);
  }
}