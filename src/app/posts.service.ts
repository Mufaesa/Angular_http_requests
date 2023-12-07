import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators'

import { Post } from "./post.model";
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
    firebaseUrl: string = "YOUR_FIREBASE_URL/";
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content};
        this.http.post<{name: string}>(
            this.firebaseUrl + '/posts.json', 
            postData)
            .subscribe(responseData => {
              console.log(responseData);
            }, error => {
              this.error.next(error.message);
            })
    }

    fetchPosts(){
      return this.http
        .get<{ [key: string]: Post }>(this.firebaseUrl + '/posts.json')
        .pipe(
          map(responseData => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
              if(responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key], id: key })
              }
            }
            return postsArray
          }),
          catchError(errorRes => {
            // Error handling
            return throwError(errorRes);
          })
        );
    }

    deletePosts(){
      return this.http.delete(this.firebaseUrl + '/posts.json');
    }
}