import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Loan } from '../../../interface/loan.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../../../services/loan.service';
import Swal from 'sweetalert2';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interface/book.interface';
import { User } from '../../../interface/user.interface';
import { UserService } from '../../../services/user.service';
import { StatusLoan } from '../../../enums/status-loan';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss'
})
export class LoanFormComponent implements OnInit {
  public form!:FormGroup
  public entity!:Loan
  public books!:Book[]
  public users!:User[]
  public statusTypes!:any[]
  public recommendationBooks!:Book[]

  constructor(
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private loanService:LoanService,
    private userService:UserService,
    private bookService:BookService,
  ) {
    this.__initivalizeForm()
  }

  ngOnInit():void {
    this.__initializeEntity()
    this.__getAllUsers()
    this.__getAllBooks()
    this.__getAllStatus()
  }

  private __initivalizeForm():void {
    this.form = new FormGroup({
      user: new FormControl(null),
      book: new FormControl(null),
      loanDate: new FormControl(''),
      returnDate: new FormControl(''),
      status: new FormControl(null),
    })
  }

  private __initializeEntity():void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.loanService.load(this.activatedRoute.snapshot.params['id']).subscribe((response:any) => {
        this.entity = response
        this.__setFormEntity(response)
      })
    } else {
      this.entity = {
        user: {},
        book: {},
        loanDate: new Date(),
        returnDate: new Date(),
        status: '',
      }
    }
  }

  private __setFormEntity(response:Loan):void {
    this.form.get('user')?.setValue(response.user)
    this.form.get('user')?.setValue(response.user)
    this.form.get('book')?.setValue(response.book)
    this.form.get('loanDate')?.setValue(response.loanDate)
    this.form.get('returnDate')?.setValue(response.returnDate)
    this.form.get('status')?.setValue(response.status)
  }

  public compareUsers(user1:User, user2:User):any {
    return user1 && user2 && user1.id === user2.id;
  }

  public compareBooks(book1:Book, book2:Book):any {
    return book1 && book2 && book1.id === book2.id;
  }

  public compareStatus(status1:any, status2:any):any {
    return status1 && status2 && status1.id === status2.id;
  }

  private __getAllUsers():void {
    this.userService.getAll().subscribe((response:any) => {
      this.users = response
    })
  }

  private __getAllBooks():void {
    this.bookService.getAll().subscribe((response:any) => {
      this.books = response
    })
  }

  private __getAllStatus():void {
    this.statusTypes = [
      { id: 'OPEN', label: StatusLoan.OPEN },
      { id: 'FINISH', label: StatusLoan.FINISH },
    ]
  }

  onChangeUser(user:User):void {
    if (user && user.id) {
      this.getRecommendationBooks(user.id)    
    }
  }

  private getRecommendationBooks(userId:number):void {
    this.bookService.getRecommendationBooks(userId).subscribe((response:any) => {
      this.recommendationBooks = response
    })
  }

  public goToList():void {
    this.route.navigate(['loan-list'])
  }

  public save():void {
    this.entity = {
      ...this.entity,
      user: this.form.get('user')?.value,
      book: this.form.get('book')?.value,
      loanDate: new Date(this.form.get('loanDate')?.value),
      returnDate: new Date(this.form.get('returnDate')?.value),
      status: this.form.get('status')?.value,
    }

    if (this.entity && this.entity.id) {
      this.loanService.update(this.entity).subscribe(
        (data) => {
          this.__getSuccessRequestMessage("Empréstimo atualizado com sucesso!")
          this.goToList()
        },
        error => {
          this.__getErrorRequestMessage(error)
        },
      )
    } else {
      this.loanService.save(this.entity).subscribe(
        (data) => {
          this.__getSuccessRequestMessage("Empréstimo registrado com sucesso!")
          this.goToList()
        },
        error => {
          this.__getErrorRequestMessage(error)
        },
      )
    }
  }

  private __getSuccessRequestMessage(title:string):void {
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  private __getErrorRequestMessage(error:any):void {
    Swal.fire({
      title: error?.error?.message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000
    });
  }

  public selectBook(book:Book):void {
    this.form.get('book')?.setValue(book)
  }
}
