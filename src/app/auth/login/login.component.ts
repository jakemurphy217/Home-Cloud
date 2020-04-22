import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  Loading = false;

  constructor(public authService: AuthService) {

  }
  onLogin(form: NgForm) {
    // logging the input value
  // console.log(form.value);
  if (form.invalid){
    return;
  }
  this.authService.login(form.value.email, form.value.password);
  }
}
