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
    this.__initializeForm()
  }

  ngOnInit():void {
    this.__initializeEntity()
  }

  private __initializeForm():void {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    })
  }

  private __initializeEntity():void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.userService.load(this.activatedRoute.snapshot.params['id']).subscribe((response:any) => {
        this.entity = response
        this.__setFormEntity(response)
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

  private __setFormEntity(response:User):void {
    this.form.get('name')?.setValue(response.name)
    this.form.get('email')?.setValue(response.email)
    this.form.get('phone')?.setValue(response.phone)
  }

  public goToList():void {
    this.route.navigate(['user-list'])
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
