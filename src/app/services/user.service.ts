import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.api
  private root = '/user'

  constructor(
    private http:HttpClient,
  ) { }

  getAll() {
    return this.http.get((this.url + this.root) + `/all`)
  }
}
