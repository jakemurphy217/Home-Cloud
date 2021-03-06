import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})
export class SignupComponent implements OnInit, OnDestroy{
  Loading = false;
  private authStatusSub: Subscription;
 title = 'Signup';
  constructor(public authService: AuthService) {
  }

  ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.Loading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    // logging the input value
  console.log(form.value);
  if (form.invalid){
    return;
  }
  this.Loading = true;
  this.authService.crateUser(form.value.email, form.value.password);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
