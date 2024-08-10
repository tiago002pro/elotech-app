import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
}
