import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Loan } from '../interface/loan.interface';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private url = environment.api
  private root = '/loan'

  constructor(
    private http:HttpClient,
  ) { }

  getAll() {
    return this.http.get((this.url + this.root) + `/all`)
  }

  save(loan:Loan) {
    return this.http.post((this.url + this.root), loan)
  }

  load(id:number):any {
    return this.http.get((this.url + this.root + `/${id}`))
  }
}
