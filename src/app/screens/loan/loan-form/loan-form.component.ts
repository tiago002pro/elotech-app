import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Loan } from '../../../interface/loan.interface';
import { Router } from '@angular/router';
import { LoanService } from '../../../services/loan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss'
})
export class LoanFormComponent implements OnInit {
  public form!:FormGroup
  public loan!:Loan

  constructor(
    private route:Router,
    private loanService:LoanService,
  ) { }

  ngOnInit():void {
    this.form = new FormGroup({
      book: new FormControl(''),
      loanDate: new FormControl(''),
      returnDate: new FormControl(''),
      status: new FormControl(''),
    })
  }

  public goToList():void {
    this.route.navigate(['user'])
  }

  public save():void {
    this.loan = {
      book: this.form.get('book')?.value,
      loanDate: new Date(this.form.get('loanDate')?.value),
      returnDate: new Date(this.form.get('returnDate')?.value),
      status: this.form.get('status')?.value,
    }
    
    this.loanService.save(this.loan).subscribe(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Empréstimo registrado com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
      this.goToList()
    })
  }
}
