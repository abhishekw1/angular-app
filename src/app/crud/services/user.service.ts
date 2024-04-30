import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _url = environment.apiUrl;

  private usersListSubject$ = new BehaviorSubject<User[]>([]);
  usersListObservable$ = this.usersListSubject$.asObservable();
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loadingObservable$ = this.loadingSubject$.asObservable();

  headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.loadingSubject$.next(true);
    this.http
      .get<User>(this._url)
      .pipe(map((res) => JSON.parse(JSON.stringify(res))))
      .subscribe((res) => {
        this.usersListSubject$.next(res);
        this.loadingSubject$.next(false);
      });
  }

  addUser(user: User): Observable<User> {
    this.loadingSubject$.next(true);

    return this.http
      .post<User>(this._url, user, { headers: this.headers })
      .pipe(
        tap((res: User) => {
          this.usersListSubject$.next([...this.usersListSubject$.value, res]);
          this.loadingSubject$.next(false);
        })
      );
  }

  updateUser(upUser: User): Observable<User> {
    this.loadingSubject$.next(true);
    return this.http
      .put<User>(this._url + `${upUser.id}`, upUser, { headers: this.headers })
      .pipe(
        tap((resUser: User) => {
          this.loadingSubject$.next(false);
          this.usersListSubject$.next(
            this.usersListSubject$.value.map((subUser) =>
              subUser.id === upUser.id ? upUser : subUser
            )
          );
        })
      );
  }

  deleteUser(id: number) {
    this.loadingSubject$.next(true);
    this.http.delete<User>(this._url + `${id}`).subscribe((res) => {
      // this.getUsers();
      this.loadingSubject$.next(false);
      this.usersListSubject$.next(
        this.usersListSubject$.value.filter(
          (user: User) => user.id && +user.id !== id
        )
      );
    });
  }
}
