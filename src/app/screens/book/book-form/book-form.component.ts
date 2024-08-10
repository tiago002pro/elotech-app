import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../../interface/book.interface';
import { Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  public form!:FormGroup
  public book!:Book

  constructor(
    private route:Router,
    private bookService:BookService,
  ) { }

  ngOnInit():void {
    this.form = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      isbn: new FormControl(''),
      publicationDate: new FormControl(''),
      category: new FormControl(''),
    })
  }

  public goToList():void {
    this.route.navigate(['book'])
  }

  public save():void {
    this.book = {
      title: this.form.get('title')?.value,
      author: this.form.get('author')?.value,
      isbn: this.form.get('isbn')?.value,
      publicationDate: new Date(this.form.get('publicationDate')?.value),
      category: this.form.get('category')?.value,
    }
    
    this.bookService.save(this.book).subscribe(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Salvo com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
      this.goToList()
    })
  }
}
