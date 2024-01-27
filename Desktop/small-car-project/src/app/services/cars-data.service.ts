import { Injectable } from '@angular/core';
import { CarData } from '../interfaces/car-data';
@Injectable({
  providedIn: 'root',
})
export class CarsDataService {
  carList: CarData[] = [
    {
      description: 'adjljakakadkdvn jdalndjklk',
      id: 1,
      price: 100000,
      title: 'BMW',
      image:
        'https://th.bing.com/th/id/R.c24cde9946ef58ebe60f229a119ec37a?rik=R%2b3Qby%2bfVchBFA&riu=http%3a%2f%2fstatic3.businessinsider.com%2fimage%2f56201752bd86ef15008c2279%2fthe-bmw-m2-sports-car-has-finally-arrived.jpg&ehk=isHARyoGKzOYM4CgXT4vY%2b5VRW5ZoiCQYl116kGYkms%3d&risl=&pid=ImgRaw&r=0',
    },
    {
      description: 'adjljakakadkdvn jdalndjklk',
      id: 2,
      price: 200000,
      title: 'MERCEDES',
      image:
        'https://www.hdwallpapers.in/download/mercedes_amg_gt_roadster_2017_4k-3840x2160.jpg',
    },
    {
      description: 'adjljakakadkdvn jdalndjklk',
      id: 3,
      price: 300000,
      title: 'tesla',
      image: 'https://cdn.motor1.com/images/mgl/G4z31/s1/tesla-roadster.jpg',
    },
  ];

  constructor() {}
}
