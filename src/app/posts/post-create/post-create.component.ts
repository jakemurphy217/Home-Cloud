import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {PostsService} from '../post.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Post} from '../post.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

// import {mimeType} from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy{
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string;
  private authStatusSub: Subscription;
  post: Post;
  Loading = false;
  form: FormGroup;
  imagePreview: string;
  title = 'PostCreate';

  constructor(public postsService: PostsService,
              public route: ActivatedRoute,
              private authService: AuthService
  ) {
  }

  ngOnInit() {

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.Loading = false;
      }
    );

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      // to be changed to upload!! 'image'
      upload: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.Loading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.Loading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            filePath: postData.filePath,
            creator: postData.creator
          };

          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            upload: this.post.filePath
          });

        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onFilePicked(event: Event) {
    // takes html input and grabs the first file from the array
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({upload: file});
    this.form.get('upload').updateValueAndValidity();
    // console.log(file.name, file.size, file.type);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }





  onSavePost() {

    // if (this.form.invalid) {
    //   return;
    // }

    this.Loading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.upload
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.upload
      );
    }
    this.form.reset();
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
