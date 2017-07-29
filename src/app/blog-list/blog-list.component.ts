import * as jQuery from 'jquery';

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss']
})
export class BlogListComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public createStory(): void {
    // 判断是否登录
    const cookie = document.cookie;
    if (cookie && /isLogin=true/.test(cookie) && localStorage.getItem('user')) {
    // navigate to blog edit.
    } else {
      this.router.navigate(['/blogedit']);
      this.toastr.warning('You need login first!', 'Warning');
    }
  }

  private initBlogList() {
    console.warn('blog list');
  }
}
