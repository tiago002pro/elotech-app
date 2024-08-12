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

  delete(id:number) {
    return this.http.delete((this.url + this.root + `/${id}`))
  }

  load(id:number):any {
    return this.http.get((this.url + this.root + `/${id}`))
  }
}
