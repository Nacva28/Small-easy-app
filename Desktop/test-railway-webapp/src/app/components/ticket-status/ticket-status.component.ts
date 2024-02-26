import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket-status',
  templateUrl: './ticket-status.component.html',
  styleUrls: ['./ticket-status.component.scss']
})
export class TicketStatusComponent {
  ticketNumber: string = '';
  ticketInfo: string = '';
  ticketNotFound: boolean = false;
  ticketRegistrationResponse: string = ''; // Include this property

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // Retrieve the ticket number from the route parameters
    this.route.params.subscribe(params => {
      this.ticketNumber = params['ticketNumber'];
    });
  }

  checkTicket() {
    // Call your API to get ticket information
    const apiUrl = `'https://railway.stepprojects.ge/api/tickets/register'`;
    
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.ticketInfo = response;
        this.ticketNotFound = false;

        // Assuming your API response has a property for ticket registration response
        this.ticketRegistrationResponse = response.ticketRegistrationResponse;
      },
      (error: any) => {
        this.ticketNotFound = true;
        this.ticketInfo = '';

        // Handle the error and set the ticket registration response accordingly
        this.ticketRegistrationResponse = 'Error checking ticket: ' + error.message;
      }
    );
  }

  deleteTicket() {
    // Call your API to delete the ticket
    const apiUrl = 'https://railway.stepprojects.ge/api/tickets/cancelAll';
    
    this.http.delete(apiUrl).subscribe(
      () => {
        // Success
        this.ticketInfo = '';
        this.ticketNotFound = false;
        this.ticketRegistrationResponse = 'Ticket deleted successfully!';
      },
      (error: any) => {
        // Handle error
        console.error('Error deleting ticket:', error);
        this.ticketRegistrationResponse = 'Error deleting ticket: ' + error.message;
      }
    );
  }
}