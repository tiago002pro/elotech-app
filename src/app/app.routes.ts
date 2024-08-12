import { Routes } from '@angular/router';
import { UserComponent } from './screens/user/user.component';
import { BookListComponent } from './screens/book/book-list/book-list.component';
import { LoanListComponent } from './screens/loan/loan-list/loan-list.component';
import { UserFormComponent } from './screens/user/user-form/user-form.component';
import { BookFormComponent } from './screens/book/book-form/book-form.component';
import { LoanFormComponent } from './screens/loan/loan-form/loan-form.component';
import { GoogleBooksComponent } from './screens/google-books/google-books.component';

export const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'user-form', component: UserFormComponent },
  { path: 'user-form/:id', component: UserFormComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book-form', component: BookFormComponent },
  { path: 'book-form/:id', component: BookFormComponent },
  { path: 'loan-list', component: LoanListComponent },
  { path: 'loan-form', component: LoanFormComponent },
  { path: 'loan-form/:id', component: LoanFormComponent },
  { path: 'google-books', component: GoogleBooksComponent },
];
