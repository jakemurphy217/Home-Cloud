import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../../app-routing.module';
import {AngularMaterialModule} from '../../angular-material.module';
import {PostCreateComponent} from './post-create.component';

describe('PostCreate', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

        PostCreateComponent
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule,
      ]
    }).compileComponents();
  }));

  it('should create the PostCreate', () => {
    const fixture = TestBed.createComponent(PostCreateComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title PostCreate`, () => {
    const fixture = TestBed.createComponent(PostCreateComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PostCreate');
  });

});
