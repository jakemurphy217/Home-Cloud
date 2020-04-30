import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {PostCreateComponent} from './post-create/post-create.component';
import {PostListComponent} from './post-list/post-list.component';
import {AngularMaterialModule} from '../angular-material.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


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
    MatAutocompleteModule
  ]
})
export class PostsModule {}
