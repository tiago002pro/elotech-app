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
    return this.http.post((this.url + this.root) + `/save`, book)
  }

  update(book:Book) {
    return this.http.put((this.url + this.root) + `/update`, book)
  }

  delete(id:number) {
    return this.http.delete((this.url + this.root + `/${id}`))
  }

  load(id:number):any {
    return this.http.get((this.url + this.root + `/${id}`))
  }

  getRecommendationBooks(userId:number) {
    return this.http.get((this.url + this.root) + `/recommendation-books?userId=${userId}`)
  }

  searchGoogleBooks(title:string) {
    return this.http.get((this.url + this.root) + `/search-googke-books?title=${title}`)
  }

  addBooksToLibrary(dto:any) {
    return this.http.post((this.url + this.root) + `/add-book-list-to-library`, dto)
  }
}
