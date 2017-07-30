import * as jQuery from 'jquery';

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { BlogListService } from './blog-list.service';
import { Blog } from './blog.model';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss'],
  providers: [BlogListService]
})
export class BlogListComponent implements OnInit {
  public blogs: Blog[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    vRef: ViewContainerRef,
    private blogListService: BlogListService
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public ngOnInit() {
    this.initBlogList();
  }

  public createStory(): void {
    // 判断是否登录
    const cookie = document.cookie;
    if (cookie && /isLogin=true/.test(cookie) && localStorage.getItem('user')) {
    // navigate to blog edit.
      this.router.navigate(['/blogedit']);
    } else {
      this.toastr.warning('You need login first!', 'Warning');
    }
  }

  private initBlogList() {
    const page = Number(this.route.snapshot.queryParams['page'] || 1);
    this.blogListService.queryList(page).subscribe((result) => {
      if (2000 === result.code) {
        this.blogs = result.data;
      }
    });
  }
}
