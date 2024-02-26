import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { HttpClient } from '@angular/common/http';
import { TicketService } from 'src/app/services/tickets.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  @ViewChild('ticketInfo', { static: false })
  ticketInfoElement!: ElementRef;
  selectedSeatId: string | null | undefined;
  ticketInfoList: any[] = [];
  selectedTrain: any;
  customerInfo: any = {};
  seatInfo: any = {};
  from: string = '';
  to: string = '';
responseText: string='';
ticketRegistrationResponse: string = '';

  constructor(
    private sharedDataService: SharedDataService,
    private http: HttpClient,
    private ticketService: TicketService,
    private router:Router
  ) {
    this.sharedDataService.customerInfo$.subscribe((customerInfo) => {
      this.customerInfo = customerInfo;
    });

    this.sharedDataService.seatInfo$.subscribe((seatInfo) => {
      this.seatInfo = seatInfo;
    });
    this.sharedDataService.from$.subscribe(from => {
      this.from = from;
    });
    this.sharedDataService.to$.subscribe(to => {
      this.to = to;
    });
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.sharedDataService.selectedSeatId$.subscribe((seatId) => {
      this.selectedSeatId = seatId;
    });

    this.showSuccessAlert();

    console.log('From:', this.from);
    console.log('To:', this.to);
  }

  showSuccessAlert() {
    Swal.fire({
      title: 'Paid Successfully',
      text: 'Click "Download PDF" to generate and download the PDF.',
      icon: 'success',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK'
    });
  }
  
  makePDf(responseText: string): void {
    let pdf = new jsPDF();
  
    // Header
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Ticket Information', 20, 20);
  
    // Ticket Number
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const uuidMatch = responseText.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
    const extractedUuid = uuidMatch ? uuidMatch[0] : 'N/A';
    pdf.text(`Ticket Number: ${extractedUuid}`, 20, 30);
  
    
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Passenger Information', 20, 60);
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`Name: ${this.customerInfo?.name || 'N/A'}`, 20, 70);
    pdf.text(`Surname: ${this.customerInfo?.surname || 'N/A'}`, 20, 80);
    pdf.text(`Personal Number: ${this.customerInfo?.personalNumber || 'N/A'}`, 20, 90);
    pdf.text(`Email Address: ${this.customerInfo?.email || 'N/A'}`, 20, 100);
    pdf.text(`Phone Number: ${this.customerInfo?.number || 'N/A'}`, 20, 110);
  
  
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Seat Information', 20, 140);
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`Seat Number: ${this.seatInfo?.seatNumber || 'N/A'}`, 20, 150);
    pdf.text(`Seat ID: ${this.selectedSeatId || 'N/A'}`, 20, 160);
    pdf.text(`Price: ${this.seatInfo?.price ? `${this.seatInfo.price} (GEL) (PAID)` : 'N/A'}`, 20, 170);
  
    pdf.save();

    Swal.fire({
      title: 'PDF Downloaded',
      text: 'The PDF has been successfully generated and downloaded.',
      icon: 'success',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK'
    });
    this.registerTicketInternal();
  }

  private registerTicketInternal(): void {

    const ticketData = {
      trainId: 1, 
      date: new Date().toISOString(),
      email: this.customerInfo?.email || 'string',
      phoneNumber: this.customerInfo?.number || 'string',
      people: [
        {
          seatId: this.selectedSeatId || 'defaultSeatId', 
          name: this.customerInfo?.name || 'string',
          surname: this.customerInfo?.surname || 'string',
          idNumber: this.customerInfo?.personalNumber || 'string',
          status: 'string',
          payoutCompleted: true,
        },
      ],
    };
  
   
   
  const endpoint = 'https://railway.stepprojects.ge/api/tickets/register';

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  this.http.post(endpoint, ticketData, { headers, responseType: 'text' }).subscribe(
    (response: any) => { 
      console.log('Ticket registered successfully:', response);
      this.ticketRegistrationResponse = response;
      this.makePDf(response);
    },
    (error: any) => {
      (error: any) => {
        console.error('Error registering ticket:', error);
      
        
        if (error.text) {
          this.ticketRegistrationResponse = error.text;
          this.makePDf(error.text);
        } else {
         
        }
      }
    }
  );
}}
