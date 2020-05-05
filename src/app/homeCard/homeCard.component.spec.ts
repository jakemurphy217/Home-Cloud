import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from '../app.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {AngularMaterialModule} from '../angular-material.module';
import {homeCardComponent} from './homeCard.component';

describe('homeCard', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        homeCardComponent
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule,
      ]
    }).compileComponents();
  }));

  it('should create the HomeCard', () => {
    const fixture = TestBed.createComponent(homeCardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title HomeCard`, () => {
    const fixture = TestBed.createComponent(homeCardComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('HomeCard');
  });

});
