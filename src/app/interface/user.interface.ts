import { Loan } from "./loan.interface";

export interface User {
  id:number;
  name:string;
  email:string;
  registrationDate:Date;
  phone:string;
  loanList:Loan[];
}