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
  public monthTrendData: {};
  public tagsAnalyzeData: {};

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
    this.initChartOfWeektrend();
    this.initChartTags();
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

  private initChartOfWeektrend() {

    this.monthTrendData = {
      type: 'line',
      data: {
        labels: ['2017-07', '2017-08'],
        datasets: [{
          label: '# Monthly Blogs',
          data: [3, 1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1,
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Monthly Trend'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }
    };

  }

  private initChartTags() {
    this.tagsAnalyzeData = {
      type: 'pie',
      data: {
        datasets: [{
          label: ' Count',
          data: [1, 2, 3],
          backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }],
        labels: [
          'Angular',
          'Linux',
          'FrontEnd'
        ]
      },
      options: {

      }
    };
  }

}
