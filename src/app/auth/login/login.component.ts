import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  Loading = false;

  onLogin(form: NgForm) {
    // logging the input value
  console.log(form.value);

  }
}
