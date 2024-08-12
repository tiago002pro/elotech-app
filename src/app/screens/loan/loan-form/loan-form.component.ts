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
  }

  private __initivalizeForm():void {
    this.form = new FormGroup({
      user: new FormControl({}),
      book: new FormControl({}),
      loanDate: new FormControl(''),
      returnDate: new FormControl(''),
      status: new FormControl(''),
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

  public goToList():void {
    this.route.navigate(['loan'])
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
    
    this.loanService.save(this.entity).subscribe(() => {
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
