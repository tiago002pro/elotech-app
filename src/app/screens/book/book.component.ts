import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

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
    private route:Router,
    private bookService:BookService
  ) {}

  ngOnInit():void {
    this.__getAll()
  }

  private __getAll():void {
    this.bookService.getAll().subscribe((response:any) => {
      this.bookList = response
    })
  }

  public goToForm():void {
    this.route.navigate(['book-form'])
  }
}
