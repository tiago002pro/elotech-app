import { Routes } from '@angular/router';
import { UserComponent } from './screens/user/user.component';
import { BookComponent } from './screens/book/book.component';
import { LoanComponent } from './screens/loan/loan.component';

export const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'book', component: BookComponent },
  { path: 'loan', component: LoanComponent },
];
