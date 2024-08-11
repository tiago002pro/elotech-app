import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userList:any[] = []

  constructor(
    private route:Router,
    private userService:UserService
  ) {}

  ngOnInit():void {
    this.__getAll()
  }

  private __getAll():void {
    this.userService.getAll().subscribe((response:any) => {
      this.userList = response
    })
  }

  public goToForm():void {
    this.route.navigate(['user-form'])
  }

  public goToEdit(id:number):void {
    this.route.navigate(['user-form', id])
  }

  public delete(id:number):void {
    Swal.fire({
      title: "Atenção!",
      text: "Você tem certeza que deseja deletar este usuário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(() => {
          Swal.fire({
            title: "Deletado!",
            text: "Usuário deletado com sucesso.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.__getAll()
        })
      }
    });
  }
}
