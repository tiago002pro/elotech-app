import { Book } from "./book.interface";

export interface Loan {
  id:number;
  book:Book;
  loanDate:Date;
  returnDate:Date;
  status:string;
}