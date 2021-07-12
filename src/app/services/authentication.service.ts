import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServiceUrls } from '../shared/service.urls';

@Injectable()
export class AuthenticationService {
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username:string, password:string) {
    localStorage.removeItem('token')
    return this.http.post<any>(ServiceUrls.HOST + ServiceUrls.AUTH_API,{ username, password }).pipe(map(data => {
      if (data) {
        localStorage.setItem('token', data['jwt']);
        this.http.get(ServiceUrls.HOST + ServiceUrls.USERS_API).subscribe((user:User) => {
          let currUser = new User(user['name'], user['username'], undefined, user['email'], user['address'], user['account'])
          currUser.balance = user['balance']
          currUser.status = user['status']
          currUser.numOfChecks = user['numOfChecks']
          this.currentUserSubject.next(currUser);
          localStorage.setItem('currentUser', JSON.stringify(currUser));
          this.router.navigate(['/home']);
        })
      }
      return data['jwt'];
    }));
  }
  
  logout(){
    localStorage.clear();
    this.currentUserSubject.next(undefined);
  }
}
