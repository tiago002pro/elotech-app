import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  bookList:any[] = []

  constructor(
    private bookService:BookService
  ) {}

  ngOnInit() {
    this.getAll()
  }

  private getAll() {
    this.bookService.getAll().subscribe((response:any) => {
      this.bookList = response
    })
  }
}
