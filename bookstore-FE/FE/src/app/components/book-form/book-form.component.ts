import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  imports:[ReactiveFormsModule ,CommonModule]
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode: boolean = false;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.bookId = +id;
        this.loadBookData(this.bookId);
      }
    });
  }

  loadBookData(id: number) {
    this.bookService.justBook(id).subscribe(book => {
      this.bookForm.patchValue(book);
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched(); 
      return;
    }

    const bookData = this.bookForm.value;

    if (this.isEditMode) {
      const bookData = { id: this.bookId, ...this.bookForm.value };
      this.bookService.updateBook(this.bookId!, bookData).subscribe(() => {
        alert('Book updated successfully!');
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(bookData).subscribe(() => {
        alert('Book created successfully!');
        this.router.navigate(['/books']);
      });
    }
  }
}
