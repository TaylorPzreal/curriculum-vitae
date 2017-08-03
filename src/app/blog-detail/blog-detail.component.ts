import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BlogDetailService } from './blog-detail.service';
import { Blog } from './blog.model';
import { User } from '../user.model';

@Component({
  selector: 'blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: [BlogDetailService]
})

export class BlogDetailComponent implements OnInit {
  public blogId: string;
  public isEditable: boolean;

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
    this.blogId = id;
  }

  private getDetail(id: string) {
    this.blogDetailService.getBlogDetail(id).subscribe((result: any) => {
      if (2000 === result.code) {
        this.blog = result.data;
        this.confirmLogin(result.data);
      }
    }, (error) => {
      console.error(error);
    });
  }

  /**
   * 验证是否登录，是否是自己的blog，进行编辑
   *
   * @private
   * @param {Blog} data
   * @memberof BlogDetailComponent
   */
  private confirmLogin(data: Blog) {
    const cookie = document.cookie;
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (cookie && /isLogin=true/.test(cookie) && user && user.name === data.author) {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
  }
}
