import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  tabsNavigate:any[] = []

  constructor(
  ) { }

  ngOnInit(): void {
    this.__createNavigateTabs()
  }

  private __createNavigateTabs():void {
    this.tabsNavigate = [
      { label: "Usuários", router: "user" },
      { label: "Livros", router: "book-list" },
      { label: "Empréstimos", router: "loan" },
      { label: "Google Books", router: "google-books" },
    ]
  }
}
