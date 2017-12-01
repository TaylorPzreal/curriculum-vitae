import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BlogService } from '../blog.service';
import { Blog } from './blog.model';

@Component({
  selector: 'blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})

export class BlogDetailComponent implements OnInit {
  public blog: Blog;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private blogService: BlogService
  ) { }

  public ngOnInit() {
    this.blog = new Blog();
    const id = this.route.snapshot.params['id'];
    this.getDetail(id);
  }

  private getDetail(id: string) {
    this.blogService.findOneBlogById(id).subscribe((result: any) => {
      if (2000 === result.code) {
        this.blog = result.data;

        this.titleService.setTitle(this.blog.title + '- HoneyMorning');
      }
    });
  }
}
