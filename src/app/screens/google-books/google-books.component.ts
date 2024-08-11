import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-google-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './google-books.component.html',
  styleUrl: './google-books.component.scss'
})
export class GoogleBooksComponent implements OnInit {
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
}
