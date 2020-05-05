import {async, TestBed} from '@angular/core/testing';
import {LoginComponent} from '../auth/login/login.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from './footer.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {AngularMaterialModule} from '../angular-material.module';

describe('FooterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule
      ]
    }).compileComponents();
  }));

  it('should create the Footer', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title 'Footer'`, () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Footer');
  });


});
