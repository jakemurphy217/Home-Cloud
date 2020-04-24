import {Post} from './post.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

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
    this.http.get<{ message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
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
    return this.http.get<{ _id: string; title: string; content: string, filePath: string }>('http://localhost:3000/api/posts/' + id);
  }


  addPost(title: string, content: string, upload: File) {

    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('upload', upload, title);

    this.http
      .post<{ message: string, post: Post }>(
        'http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        // console.log(responseData.message);
        // const post: Post = {
        //   id: responseData.post.id,
        //   title,
        //   content,
        //   filePath: responseData.post.filePath
        // };
        //
        // this.posts.push(post);
        // this.postsUpdated.next([...this.posts]);

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
        filePath: upload
      };
    }
    // const post: Post = {id, title, content, filePath: null};
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response => {

        // const updatedPosts = [...this.posts];
        // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        // const post: Post = {
        //   id,
        //   title,
        //   content,
        //   filePath: 'response.filePath'
        // };
        // updatedPosts[oldPostIndex] = post;
        // this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
    // .subscribe(() => {
    //   console.log('Post Deleted!!');
    //   const updatedPosts = this.posts.filter(post => post.id !== postId);
    //   this.posts = updatedPosts;
    //   this.postsUpdated.next([...this.posts]);
    // });
  }
}
