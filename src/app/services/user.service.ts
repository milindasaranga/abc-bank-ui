import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { ServiceUrls } from '../shared/service.urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private auth:AuthenticationService) { }

  register(user:User) {
    return this.http.post<any>(ServiceUrls.HOST + ServiceUrls.USER_ADD_API, user);
  }

  getUserData(){
    return this.http.get(ServiceUrls.HOST + ServiceUrls.USERS_API);
  }
}
