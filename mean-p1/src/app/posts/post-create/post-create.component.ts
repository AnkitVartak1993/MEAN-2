import { Component, EventEmitter, Output } from '@angular/core';
import { Button } from 'protractor';
import {Post} from './../post.model';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter<Post>();
  newPost = 'No content';

  onAddPost() {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);
    console.log('Added');
  }
}
