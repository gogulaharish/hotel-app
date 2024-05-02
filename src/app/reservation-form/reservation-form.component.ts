import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from "@angular/forms";
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservations/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
 
  reservationForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private reservationService: ReservationService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { 
    this.reservationForm = this.formBuilder.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      guestName:['',Validators.required],
      guestEmail:['',[Validators.required,Validators.email]],
      roomNumber:['',Validators.required],
    })

    let id = +this.activatedRoute.snapshot.params['id'];
    if(id){
      this.reservationService.getReservation(id).subscribe(res =>{
        if(res){
          this.reservationForm.patchValue(res);
        }
      });     
    }
  }

  ngOnInit() {
    
  }

  onSubmit(){
    if(this.reservationForm.valid){
      let reservation:Reservation = this.reservationForm.value;
      let id = +this.activatedRoute.snapshot.params['id'];

      if(id){
        this.reservationService.updateReservation(id,reservation).subscribe(res=>{
          this.router.navigate(['/list']);
      
        });
      }
      else{
        this.reservationService.addReservation(reservation).subscribe(res=>{
          this.router.navigate(['/list']);
      
        });
      }
      
      
    }
    
    

  }

}
