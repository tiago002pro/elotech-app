import { Component, OnInit } from '@angular/core';
import { User } from '../../../interface/user.interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  public entity!:User

  constructor(
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
  ) {
    this.__initializeEntity()
  }

  ngOnInit():void {
    this.__initializeForm({})
  }

  private __initializeEntity():void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.userService.load(this.activatedRoute.snapshot.params['id']).subscribe((response:any) => {
        this.entity = response
        this.__initializeForm(response)
      })
    } else {
      this.entity = {
        name: '',
        email: '',
        registrationDate: new Date(),
        phone: '',
      }
    }
  }

  private __initializeForm(user:User):void {
    this.form = new FormGroup({
      name: new FormControl(user ? user.name : ''),
      email: new FormControl(user ? user.email : ''),
      phone: new FormControl(user ? user.phone : ''),
    })
  }

  public goToList():void {
    this.route.navigate(['user'])
  }

  public save():void {
    this.entity = {
      ...this.entity,
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
    }
    
    this.userService.save(this.entity).subscribe(() => {
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
