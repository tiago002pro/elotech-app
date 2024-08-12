import { Book } from "./book.interface";
import { User } from "./user.interface";

export interface Loan {
  id?:number;
  user?:User;
  book?:Book;
  loanDate?:Date;
  returnDate?:Date;
  status?:string;
}