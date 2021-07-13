import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordMatch } from '../shared/pass-match.validator';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  loading:boolean;

  userTypes = ["USER","ADMIN"];

  message:string;
  invalid:boolean;

  constructor(
      private auth:AuthenticationService, 
      private router:Router,
      private toastr: ToastrService,
      private formBuilder:FormBuilder,
      private userService:UserService
  ) { 
    
  }

  close() {
    this.invalid = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      address : ['', Validators.required],
      userRole : ['', Validators.required],
      username : ['',Validators.required],
      password : ['',[Validators.required, Validators.minLength(6)]],
      confPassword : ['',[Validators.required, Validators.minLength(6)]]
    }, {
      validator : PasswordMatch('password', 'confPassword')
    });
    this.loading = false;
    this.invalid = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loading = true;
      let newUser = new User(
        this.registerForm.value.name, 
        this.registerForm.value.username, 
        this.registerForm.value.password, 
        this.registerForm.value.email, 
        this.registerForm.value.address, 
        this.registerForm.value.account
      );
      this.userService.register(newUser).subscribe(data => {
        this.auth.login(newUser.username, newUser.password).subscribe(data => {
          this.toastr.success("Your account has been registered successfully!");
          this.router.navigate(['/home']);
        });
      }, error => {
        this.toastr.error("Unable to register user");
        this.invalid = true;
      })
    }
    this.loading = false;
    // this.loading = true;
  }

}
