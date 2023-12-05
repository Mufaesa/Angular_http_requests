import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);

    // Even though the 'postData' variable is a JavaScript object, Firebase will interpret this as json.
    this.http.post<{name: string}>(
      'MY_FIREBASE_URL/posts.json', 
      postData)
      .subscribe(responseData => {
        console.log(responseData);
      })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http
    .get<{ [key: string]: Post }>('MY_FIREBASE_URL/posts.json')
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray
      })
    )
    .subscribe(posts => {
      this.loadedPosts = posts;
       console.log(posts);
    });
  }
}
