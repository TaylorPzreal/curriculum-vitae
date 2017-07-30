import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { QuillComponent } from '../quill';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Blog } from './blog.model';
import { User } from '../user.model';

import { BlogEditService } from './blog-edit.service';

@Component({
  selector: 'blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['blog-edit.component.scss'],
  providers: [BlogEditService]
})
export class BlogEditComponent implements OnInit {
  public blog: Blog;

  public blogTags = [
    { id: 0, name: 'Please select a tag.' },
    { id: 1, name: 'FrontEnd' },
    { id: 2, name: 'BackEnd' },
    { id: 3, name: 'Database' },
    { id: 4, name: 'Technology' },
    { id: 5, name: 'Angular' },
    { id: 6, name: 'React' },
    { id: 7, name: 'Linux' },
    { id: 8, name: 'Culture' },
    { id: 9, name: 'Self' },
    { id: 10, name: 'Community' }
  ];

  private user: User;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    vRef: ViewContainerRef,
    private blogEditService: BlogEditService,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public ngOnInit(): void {
    const userTmp = JSON.parse(localStorage.getItem('user'));
    if (userTmp) {
      this.user = userTmp;
    } else {
      this.user = {
        name: 'HM',
        id: 0,
        bio: '',
        logo: ''
      };
    }

    const id: any = Number(this.route.snapshot.queryParams['id']);

    if (!id) {
      // if here no blog id, it's add blog, others edit blog.
      this.blog = {
        id: 0,
        title: null,
        detail: null,
        desc: null,
        coverImage: null,
        tag: this.blogTags[0].name,
        author: this.user.name,
        authorId: this.user.id,
        logo: this.user.logo
      };
    } else {
      this.toastr.info('Getting blog detail ... ', 'Loading');
      console.warn('get blog detail');
      this.getBlogById(id);
    }
  }

  public publishStory() {
    this.blogEditService.editBlog(this.blog).subscribe(
      (result: any) => {
        if (2000 === result.code) {
          this.toastr.success('Save Success', 'Success');
          this.router.navigate(['/bloglist']);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // get quill editor's innerHtml
  public getDetailReturn(event: string) {
    const onData = JSON.parse(event);
    this.blog.detail = onData.detail;
    this.blog.coverImage = onData.coverImage;
  }

  private getBlogById(id: number) {
    // get from server
    this.blog = {
      id: 0,
      title: null,
      detail: null,
      desc: null,
      coverImage: null,
      tag: 'Please select a tag.',
      author: this.user.name,
      authorId: this.user.id,
      logo: this.user.logo
    };
  }
}
