import * as jQuery from 'jquery';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss']
})
export class BlogListComponent {
  private initBlogList() {
    console.warn('blog list');
  }
}
