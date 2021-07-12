import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AppComponent } from '../app.component';
import { User } from '../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentUser:User;

  constructor(private router:Router, 
    private auth:AuthenticationService, 
    private app:AppComponent
    ){
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.currentUser && this.currentUser.account === 'admin' ) {
      this.router.navigate(['/admin']);
    } else if (this.currentUser) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
