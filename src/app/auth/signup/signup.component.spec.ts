import {SignupComponent} from './signup.component';
// @ts-ignore
import {async, TestBed} from '@angular/core/testing';
// @ts-ignore
import {AngularMaterialModule} from '../../angular-material.module';
// @ts-ignore
import {AppRoutingModule} from '../../app-routing.module';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {FooterComponent} from '../../footer/footer.component';
// @ts-ignore
import {HeaderComponent} from '../../header/header.component';

describe('signupComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignupComponent,
        HeaderComponent,
        FooterComponent
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule
      ]
    }).compileComponents();
  }));

  it('should create the Signup', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title 'signup'`, () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Signup');
  });


});
