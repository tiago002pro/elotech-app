import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss'
})
export class LoanComponent implements OnInit {
  loanList:any[] = []

  constructor(
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
}
