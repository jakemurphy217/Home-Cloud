import {Post} from './post.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiURL + '/posts/';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, posts: any, maxPosts: number }>(BACKEND_URL + queryParams)
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              filePath: post.filePath,
              creator: post.creator
            };
          }),
          maxPosts: postData.maxPosts
        };
      }))
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getpostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      filePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }


  addPost(title: string, content: string, upload: File) {

    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('upload', upload, title);

    this.http
      .post<{ message: string, post: Post }>(
        BACKEND_URL, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }


  updatePost(id: string, title: string, content: string, upload: File | string) {
    let postData: Post | FormData;
    if (typeof (upload) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('upload', upload, title);
    } else {
      postData = {
        id,
        title,
        content,
        filePath: upload,
        creator: null
      };
    }
    // const post: Post = {id, title, content, filePath: null};
    this.http.put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);

  }
}
