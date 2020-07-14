import { Injectable } from '@angular/core';
// HttpClient/HttpRes
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
// observable/return err
import { Observable, throwError } from 'rxjs';
//error handler/tap (into observable stream, allow emitted values)
import { catchError, tap } from 'rxjs/operators';

// IUser
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string = '/api/users/users.json';
  constructor(private http: HttpClient) { }

  // get
  getUsers(): Observable<IUser[]> {
    console.log(this.userUrl)
    return this.http.get<IUser[]>(this.userUrl)
      .pipe(
        tap(data => console.log('All ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  // get/:id
  getUsersById(id: number): Observable<IUser[]> {

    return this.http.get<IUser[]>(this.userUrl + '/' + id)
      .pipe(
        tap(data => console.log('All ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // error handler
  private handleError(err: HttpErrorResponse) {
    //in a real world app, we may send server to some remote logging infrastructure
    //instead of just logging it the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //client-side or network error occurred, handle it accordingly
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      //backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}