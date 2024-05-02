import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservations/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit{

   reservations: Reservation[]=[];

  constructor(private reservationService: ReservationService){

  }
  ngOnInit(): void {
    this.getAllReservations(); 
  }

  getAllReservations(){
    this.reservationService.getReservations().subscribe(res=>{
      this.reservations = res;
    });
  }

  deleteReservaton(id:number){
    this.reservationService.deleteReservation(id).subscribe(res=>{
      this.getAllReservations();
    });
  }

}
