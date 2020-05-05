import {async, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../../app-routing.module';
import {AngularMaterialModule} from '../../angular-material.module';
import {PostListComponent} from './post-list.component';

describe('PostList', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostListComponent
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        AngularMaterialModule,
      ]
    }).compileComponents();
  }));

  it('should create the PostList', () => {
    const fixture = TestBed.createComponent(PostListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title PostList`, () => {
    const fixture = TestBed.createComponent(PostListComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PostList');
  });

});
