import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'abc-bank';

  currentUser:User;

  constructor(
    private router:Router, 
    private authService:AuthenticationService,
    private toastr: ToastrService){

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastr.success("You have been logged out!");
  }

}
