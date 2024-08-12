import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../../services/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit {
  loanList:any[] = []

  constructor(
    private route:Router,
    private loanService:LoanService
  ) {}

  ngOnInit() {
    this.getAll()
  }

  private getAll() {
    this.loanService.getAll().subscribe((response:any) => {
      this.loanList = response
    })
  }

  public goToForm():void {
    this.route.navigate(['loan-form'])
  }

  public goToEdit(id:number):void {
    this.route.navigate(['loan-form', id])
  }
}
