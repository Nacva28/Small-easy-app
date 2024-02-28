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
  ticketRegistrationResponse: string = ''; 

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      this.ticketNumber = params['ticketNumber'];
    });
  }

  checkTicket() {
    
    const apiUrl = `'https://railway.stepprojects.ge/api/tickets/register'`;
    
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.ticketInfo = response;
        this.ticketNotFound = false;

       
        this.ticketRegistrationResponse = response.ticketRegistrationResponse;
      },
      (error: any) => {
        this.ticketNotFound = true;
        this.ticketInfo = '';

        this.ticketRegistrationResponse = 'Error checking ticket: ' + error.message;
      }
    );
  }

  deleteTicket() {
   
    const apiUrl = 'https://railway.stepprojects.ge/api/tickets/cancelAll';
    
    this.http.delete(apiUrl).subscribe(
      () => {
       
        this.ticketInfo = '';
        this.ticketNotFound = false;
        this.ticketRegistrationResponse = 'Ticket deleted successfully!';
      },
      (error: any) => {
        
        console.error('Error deleting ticket:', error);
        this.ticketRegistrationResponse = 'Error deleting ticket: ' + error.message;
      }
    );
  }
}