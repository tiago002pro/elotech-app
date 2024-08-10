import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

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
    private userService:UserService
  ) {}

  ngOnInit() {
    this.getAll()
  }

  private getAll() {
    this.userService.getAll().subscribe((response:any) => {
      this.userList = response
    })
  }
}
