import { Component, OnInit } from '@angular/core';
import { User } from '../../../interface/user.interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  public form!:FormGroup
  public user!:User

  constructor(
    private route:Router,
    private userService:UserService,
  ) { }

  ngOnInit():void {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    })
  }

  public goToList():void {
    this.route.navigate(['user'])
  }

  public save():void {
    this.user = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      registrationDate: new Date(),
      phone: this.form.get('phone')?.value,
      loanList: []
    }
    
    this.userService.save(this.user).subscribe(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Salvo com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
      this.goToList()
    })
  }
}
