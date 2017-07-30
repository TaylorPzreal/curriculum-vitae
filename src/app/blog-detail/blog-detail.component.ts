import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BlogDetailService } from './blog-detail.service';
import { Blog } from './blog.model';

@Component({
  selector: 'blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: [BlogDetailService]
})

export class BlogDetailComponent implements OnInit {
  public blog: Blog = {
    title: null,
    author: null,
    authorId: null,
    logo: null,
    ctime: null,
    tag: null,
    detail: null
  };
  constructor(
    private blogDetailService: BlogDetailService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.getDetail(id);
  }

  private getDetail(id: string) {
    this.blogDetailService.getBlogDetail(id).subscribe((result: any) => {
      if (2000 === result.code) {
        this.blog = result.data;
      }
    }, (error) => {
      console.error(error);
    });
  }
}
