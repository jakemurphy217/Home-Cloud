
import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {Post} from "../post.model";
import {Subscription} from "rxjs";
import { PostsService } from '../post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: "first posr", content:"this is the first post"},
  //   {title: "secound posr", content:"this is the secound post"},
  //   {title: "third posr", content:"this is the third post"}
  // ];

 posts: Post[] = [];
 private postsSub: Subscription;

constructor(public postsService: PostsService){}

ngOnInit(){
this.postsService.getPosts();
this.postsSub = this.postsService.getpostUpdatedListener().subscribe((posts: Post[])=> {
      this.posts = posts;
  });
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
}

}
