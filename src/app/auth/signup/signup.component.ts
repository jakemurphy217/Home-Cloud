import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})
export class SignupComponent {
  Loading = false;

  constructor(public authService: AuthService) {
  }

  onSignup(form: NgForm) {
    // logging the input value
  console.log(form.value);
  if (form.invalid){
    return;
  }
  this.Loading = true;
  this.authService.crateUser(form.value.email, form.value.password).subscribe(null,
    error => {
    this.Loading = false;
    });

  }
}
