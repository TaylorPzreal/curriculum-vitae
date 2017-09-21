import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Blog } from './blog.model';
import { User } from '../../../user.model';
interface IEditorData {
  detail: string;
  coverImage: string;
}

import { AppService } from '../../../app.service';
import { BlogEditService } from './blog-edit.service';
import { Editor } from '../../../tool/editor';

@Component({
  selector: 'blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['blog-edit.component.scss'],
  providers: [BlogEditService]
})
export class BlogEditComponent implements OnInit {
  public blog: Blog;
  // public editorConfig: {};
  public ngxCropperConfig: object;
  public editorConf: object;

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
  private blogId: string;
  private editorData: IEditorData; // detail , coverImage

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    vRef: ViewContainerRef,
    private blogEditService: BlogEditService,
    private router: Router,
    private titleService: Title,
    private appService: AppService
  ) {
    this.titleService.setTitle('EditBlog - HoneyMorning');

    this.toastr.setRootViewContainerRef(vRef);

    const userTmp = JSON.parse(localStorage.getItem('user'));
    if (userTmp) {
      this.user = userTmp;
    } else {
       this.toastr.warning('Please login first');
       this.router.navigate(['/blogs']);
       return;
    }

    // init blogId
    this.route.queryParams.subscribe((params: Params) => {
      this.blogId = params['id'] || null;
    });

    // init blog
    this.blog = {
      id: this.blogId,
      title: null,
      detail: null,
      desc: null,
      coverImage: null,
      tag: 'Please select a tag.',
      author: this.user.name,
      authorId: this.user.id,
      logo: this.user.logo
    };

    // this.ngxCropperConfig = {
    //   url: `${this.appService.baseURL}/uc/uploadPicture`, // image server url
    //   maxsize: 512000, // image max size, default 500k = 512000bit
    //   title: '调整案例图片的位置和尺寸', // edit modal title, this is default
    //   uploadBtnName: '选择图片', // default Upload Image
    //   uploadBtnClass: null, // default bootstrap styles, btn btn-primary
    //   cancelBtnName: '取消', // default Cancel
    //   cancelBtnClass: null, // default bootstrap styles, btn btn-default
    //   applyBtnName: '应用', // default Apply
    //   applyBtnClass: null, // default bootstrap styles, btn btn-primary
    //   fdName: 'upload', // default 'file', this is  Content-Disposition: form-data; name="file"; filename="fire.jpg"
    //   aspectRatio: 43 / 30// default 1 / 1, for example: 16 / 9, 4 / 3 ...
    // };
    this.editorConf = (new Editor(this.appService)).config;

  }

  public ngOnInit(): void {
    if (this.blogId) { // edit
      this.toastr.info('Getting blog detail ... ', 'Loading');
      this.getBlogById(this.blogId);
    }
  }

  /**
   * add new save or edit save
   *
   * @memberof BlogEditComponent
   */
  public publishStory() {
    this.blog.detail = this.editorData.detail;
    this.blog.coverImage = this.editorData.coverImage;

    this.blogEditService.editBlog(this.blog).subscribe(
      (result: any) => {
        if (2000 === result.code) {
          this.toastr.success('New add success', 'Success');
          this.router.navigate(['/blogs']);
        } else if (2001 === result.code) {
          this.toastr.success('Update success', 'Success');
          this.router.navigate(['/blogv', this.blogId]);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  /**
   * get quill editor's innerHtml
   *
   * @param {string} event htmlstring
   * @memberof BlogEditComponent
   */
  public getDetailReturn(event: string) {
    this.editorData = JSON.parse(event);
  }

  /**
   * 获取Blog详情
   *
   * @private
   * @param {string} id
   * @memberof BlogEditComponent
   */
  private getBlogById(id: string) {
    // get from server
    this.blogEditService.getBlogDetail(id).subscribe((result: any) => {
      if (2000 === result.code) {
        this.blog.title = result.data.title;
        this.blog.detail = result.data.detail;
        this.blog.desc = result.data.desc;
        this.blog.coverImage = result.data.coverImage;
        this.blog.tag = result.data.tag;
      }
    });
  }
}
