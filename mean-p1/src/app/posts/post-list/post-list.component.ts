import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  constructor() { }
  // posts = [
  //   {title: 'First Post', content: 'Data of first'},
  //   {title: '2nd Post', content: 'Data of 2nd'},
  //   {title: '3rd Post', content: 'Data of 3rd'},
  // ];
  @Input() posts = [];

  ngOnInit() { }
}
