import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Post} from './../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postService: PostService) { }
  // posts = [
  //   {title: 'First Post', content: 'Data of first'},
  //   {title: '2nd Post', content: 'Data of 2nd'},
  //   {title: '3rd Post', content: 'Data of 3rd'},
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;
  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
