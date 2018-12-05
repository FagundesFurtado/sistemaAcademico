﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://18.228.197.162:3000/autenticacao', { username, password })
      .pipe(map(user => {
        console.log(user);
        if (user && user.Autenticacao) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
        } else {
          console.log('nao entrou no user');
        }
        return user;
      })).timeout(3000);
  }

  logout() {

    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
