import { Component } from '@angular/core';
import { Button } from 'protractor';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent {
  enteredValue = '';
  newPost = 'No content';

  onAddPost() {
    console.log('Added');
    this.newPost = this.enteredValue;
  }
}
