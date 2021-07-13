import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public message: string;
  public submitted: boolean = false;
  public loading: boolean = false;
  public invalid: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    if (this.auth.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.submitted = false;
    this.loading = false;
    this.invalid = false;
  }

  get f() { 
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe((data: any) => {
          if (data) {
            this.toastr.success("You have been logged in!");
            this.router.navigate(['/']);
          } else {
            this.invalid = true;
            this.toastr.error("Invalid Username or Password");
            this.loading = false;
          }
        }, (error: any) => {
          this.invalid = true;
          this.toastr.error("Invalid Username or Password");
          this.loading = false;
        });
    }
  }

}
