import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../service/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  //styleUrls: ['./book-list.component.css'],
  imports: [CommonModule] 
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.bookService.allBooks().subscribe(data => this.books = data);
  }


  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => this.ngOnInit());
  }

  editBook(id: number) {
    this.router.navigate(['/edit-book', id]);
  }
}