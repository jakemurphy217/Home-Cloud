import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {PostCreateComponent} from './post-create/post-create.component';
import {PostListComponent} from './post-list/post-list.component';
import {AngularMaterialModule} from '../angular-material.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FileSaverModule} from 'ngx-filesaver';
import {MatIconModule} from '@angular/material/icon';
import {ImgFallbackModule} from 'ngx-img-fallback';
import {HttpClientModule} from '@angular/common/http';
import {NgxDropzoneModule} from 'ngx-dropzone';


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    MatAutocompleteModule,
    FileSaverModule,
    MatIconModule,
    ImgFallbackModule,
    HttpClientModule,
    NgxDropzoneModule
  ]
})
export class PostsModule {}
