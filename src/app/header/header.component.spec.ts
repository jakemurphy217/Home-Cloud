import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from '../app.component';
import {HeaderComponent} from './header.component';
import {FooterComponent} from '../footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {AngularMaterialModule} from '../angular-material.module';

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule,
      ]
    }).compileComponents();
  }));

  it('should create the Header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title Header'`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Header');
  });

});
