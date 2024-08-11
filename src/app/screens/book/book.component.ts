import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  bookList:any[] = []

  constructor(
    private route:Router,
    private bookService:BookService
  ) {}

  ngOnInit():void {
    this.__getAll()
  }

  private __getAll():void {
    this.bookService.getAll().subscribe((response:any) => {
      this.bookList = response
    })
  }

  public goToForm():void {
    this.route.navigate(['book-form'])
  }

  public goToEdit(id:number):void {
    this.route.navigate(['book-form', id])
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
        this.bookService.delete(id).subscribe(
          data => {
            Swal.fire({
              title: "Deletado!",
              text: "Usuário deletado com sucesso.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.__getAll()
          },
          error => {
            Swal.fire({
              title: "Não foi possivel deletar!",
              text: "Este livro já foi vinculado a um empréstimo.",
              icon: "error",
              showConfirmButton: false,
              timer: 2000
            });
          },
        )
      }
    });
  }
}
