import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];
  private apiUrl = "http://localhost:3000"

  constructor(private http:HttpClient) { 
    // let savedReservations = localStorage?.getItem('reservations');
    // this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl +'/reservations');
  }

  getReservation(id:number): Observable<Reservation>{
    return this.http.get<Reservation>(this.apiUrl + '/reservations/' + id);
    // return this.reservations.find(reservation => reservation.id === id);
  }

  addReservation(reservation: Reservation): Observable<Reservation>{
   return this.http.post<Reservation>(this.apiUrl + '/reservations' ,reservation);   
  }

  deleteReservation(id:number): Observable<Reservation>{
    return this.http.delete<Reservation>(this.apiUrl + '/reservations/' + id);
  }

  updateReservation(id:number,updatedReservation: Reservation): Observable<Reservation>{
    return this.http.put<Reservation>(this.apiUrl + '/reservations/' + id, updatedReservation);
  }
}
