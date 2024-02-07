export interface Trains {id:number,
    number:number,
    date:string,
    from:string,
    to:string,
    departure:string,
    arrive:string,
    departureId:number,
    vagons:[{
        id:number;
        trainId:number,
        name:string,
        seats:null
    }]


}
