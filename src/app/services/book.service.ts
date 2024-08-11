import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interface/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = environment.api
  private root = '/book'

  constructor(
    private http:HttpClient
  ) { }

  getAll() {
    return this.http.get((this.url + this.root) + `/all`)
  }

  save(book:Book) {
    return this.http.post((this.url + this.root), book)
  }

  searchGoogleBooks(title:string) {
    return this.http.get((this.url + this.root) + `/search-googke-books?title=${title}`)
  }
}
