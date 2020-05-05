import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from '../app.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';
import {AngularMaterialModule} from '../angular-material.module';
import {ErrorComponent} from './error.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('ErrorComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ErrorComponent
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule,
      ],
      providers: [
        MAT_DIALOG_DATA,
      ]
    }).compileComponents();
  }));

  it('Error should be created', async (() => {
    expect(ErrorComponent).toBeTruthy();
  }));

});
