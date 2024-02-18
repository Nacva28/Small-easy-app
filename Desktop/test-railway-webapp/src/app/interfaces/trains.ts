export interface Trains {
  trainNumber: any;
  arrivalId: any;
  name: string;
  number: number;
  date: string;
  departure: string;
  arrive: string;
  departureId: number;
  to: string;
  from: string;
  vagons: [
    {
      id: number;
      trainId: number;
      name: string;
      seats: null;
    }
  ];
}
