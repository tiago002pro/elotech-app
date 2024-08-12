import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../../interface/book.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  public form!:FormGroup
  public entity!:Book

  constructor(
    private route:Router,
    private activatedRoute:ActivatedRoute,
    private bookService:BookService,
  ) {
    this.__initializeForm()
  }

  ngOnInit():void {
    this.__initializeEntity()
  }

  private __initializeForm():void {
    this.form = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      isbn: new FormControl(''),
      publicationDate: new FormControl(null),
      category: new FormControl(''),
    })
  }

  private __initializeEntity():void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.bookService.load(this.activatedRoute.snapshot.params['id']).subscribe((response:any) => {
        this.entity = response
        this.__setFormEntity(response)
      })
    } else {
      this.entity = {
        title: '',
        author: '',
        isbn: '',
        publicationDate: new Date(),
        category: '',
      }
    }
  }

  private __setFormEntity(response:Book):void {
    this.form.get('title')?.setValue(response.title)
    this.form.get('author')?.setValue(response.author)
    this.form.get('isbn')?.setValue(response.isbn)
    this.form.get('publicationDate')?.setValue(response.publicationDate)
    this.form.get('category')?.setValue(response.category)
  }

  public goToList():void {
    this.route.navigate(['book-list'])
  }

  public save():void {
    this.entity = {
      ...this.entity,
      title: this.form.get('title')?.value,
      author: this.form.get('author')?.value,
      isbn: this.form.get('isbn')?.value,
      publicationDate: new Date(this.form.get('publicationDate')?.value),
      category: this.form.get('category')?.value,
    }
    
    this.bookService.save(this.entity).subscribe(() => {
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
