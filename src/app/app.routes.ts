import { Routes } from '@angular/router';
import { UserComponent } from './screens/user/user.component';
import { BookComponent } from './screens/book/book.component';
import { LoanComponent } from './screens/loan/loan.component';
import { UserFormComponent } from './screens/user/user-form/user-form.component';
import { BookFormComponent } from './screens/book/book-form/book-form.component';
import { LoanFormComponent } from './screens/loan/loan-form/loan-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'book', component: BookComponent },
  { path: 'book-form', component: BookFormComponent },
  { path: 'loan', component: LoanComponent },
  { path: 'loan-form', component: LoanFormComponent },
];
