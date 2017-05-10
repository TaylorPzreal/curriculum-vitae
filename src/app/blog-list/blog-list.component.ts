import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss']
})

export class BlogListComponent implements OnInit {

  public ngOnInit() {

    this.initBlogList();
  }

  private initBlogList() {
    console.warn('blog list');
  }
}
