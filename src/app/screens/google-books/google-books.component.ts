import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-google-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './google-books.component.html',
  styleUrl: './google-books.component.scss'
})
export class GoogleBooksComponent implements OnInit {
  public selectedBooks:any[] = []
  public bookList:any[] = []
  public search:string = ''

  constructor(
    private bookService:BookService
  ) {}

  ngOnInit():void {

  }

  private __searchGoogleBooks():void {
    this.bookService.searchGoogleBooks(this.search).subscribe((response:any) => {
      this.bookList = response
    })
  }

  public onChange():void {
    if (this.search && this.search != '') {
      this.__searchGoogleBooks()
    }
  }

  public selectBook(book:any) {
    const exists:any[] = this.selectedBooks.filter((selected) => selected.id == book.id)
    if (!(exists.length > 0)) {
      this.selectedBooks.push(book)
    }
  }

  public removeBook(book:any) {
    const index = this.selectedBooks.findIndex((selected) => selected.id == book.id)
    if (index !== -1) {
      this.selectedBooks.splice(index, 1)
    }
  }

  public addBooksToLibrary() {
    this.bookService.addBooksToLibrary(this.selectedBooks).subscribe(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Livros adicionados a biblioteca!",
        showConfirmButton: false,
        timer: 1500
      });
      this.selectedBooks = []
    })
  }
}
