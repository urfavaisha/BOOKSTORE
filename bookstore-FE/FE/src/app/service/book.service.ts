import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';




export interface Book {
  id?: number;
  title: string;
  author: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private urlAPI = 'http://localhost:8080/books'
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  allBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.urlAPI)
      .pipe(catchError(error => this.handleError(error)))
  }
  justBook(id:number):Observable<Book>{
    return this.http.get<Book>(`${this.urlAPI}/${id}`)
      .pipe(catchError(error => this.handleError(error)))
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.urlAPI, book)
      .pipe(catchError(error => this.handleError(error)));
  }
  updateBook(id:number , book:Book):Observable<Book>{
    return this.http.put<Book>(`${this.urlAPI}/${id}`, book)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            return throwError(() => 'Book not found');
          }
          return this.handleError(error);
        })
      );
  }
  deleteBook(id:number):Observable<void>{
    return this.http.delete<void>(`${this.urlAPI}/${id}`)
      .pipe(catchError(error => this.handleError(error)))
  }
}
