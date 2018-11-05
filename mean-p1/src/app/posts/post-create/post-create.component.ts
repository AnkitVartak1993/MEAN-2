import { Component } from '@angular/core';
import { Button } from 'protractor';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  constructor(public postService: PostService) { }
  enteredContent = '';
  enteredTitle = '';
  // @Output() postCreated = new EventEmitter<Post>();
  newPost = 'No content';

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.postCreated.emit(post);
    this.postService.addPost(form.value.title, form.value.content);
    console.log('Added');
  }
}
