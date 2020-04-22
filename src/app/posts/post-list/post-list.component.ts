import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Post} from '../post.model';
import {Subscription} from 'rxjs';
import {PostsService} from '../post.service';
import {PageEvent} from '@angular/material/paginator';
import {AuthService} from '../../auth/auth.service';

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
  Loading = false;
  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOption = [1, 2, 5, 10];
  currentPage = 1;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(public postsService: PostsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.Loading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getpostUpdatedListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.Loading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangePage(pageData: PageEvent) {
    // console.log(pageData);
    this.Loading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.Loading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
