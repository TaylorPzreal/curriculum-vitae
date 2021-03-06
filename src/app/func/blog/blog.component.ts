import * as jQuery from 'jquery';

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { BlogService } from './blog.service';
import { Blog } from './blog.model';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss']
})
export class BlogComponent implements OnInit {
  public blogs: Blog[];
  public monthTrendData: {};
  public tagsAnalyzeData: {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    vRef: ViewContainerRef,
    private blogService: BlogService,
    private titleService: Title
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  public ngOnInit() {
    this.initBlogList();
    // this.initChartOfMonthBlogs();
    // this.initChartTags();

    this.titleService.setTitle('Blog - HoneyMorning');
  }

  /**
   * 添加blog
   *
   * @memberof BlogListComponent
   */
  public createStory(): void {
    // 判断是否登录
    const cookie = document.cookie;
    if (localStorage.getItem('account')) {
      // navigate to blog edit.
      this.router.navigate(['/blog/edit']);
    } else {
      this.toastr.warning('You need login first!', 'Warning');
    }
  }

  /**
   * get blog list
   *
   * @private
   * @memberof BlogListComponent
   */
  private initBlogList() {
    const page = Number(this.route.snapshot.queryParams['page'] || 1);
    this.blogService.queryList(page).subscribe((result) => {
      if (2000 === result.code) {
        this.blogs = result.data;
      }
    });
  }

  private initChartOfMonthBlogs() {
    this.blogService.monthBlogs().subscribe((result) => {
      if (2000 === result.code) {
        const labels: string[] = [];
        const data: number[] = [];

        result.data.forEach((e: any) => {
          labels.push(e.name);
          data.push(e.value);
        });

        this.monthTrendData = {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: '# Monthly Blogs',
                data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Monthly Trend'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        };
      }
    });
  }

  /**
   * tag analyse
   *
   * @private
   * @memberof BlogListComponent
   */
  private initChartTags() {
    this.blogService.tagStatistic().subscribe((result) => {
      if (2000 === result.code) {
        const data: number[] = [];
        const labels: string[] = [];
        result.data.forEach((e: any) => {
          data.push(e.value);
          labels.push(e.name);
        });

        this.tagsAnalyzeData = {
          type: 'doughnut',
          data: {
            datasets: [
              {
                label: ' Count',
                data,
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
              }
            ],
            labels
          },
          options: {
           title: {
              display: true,
              text: 'Tags Analyse'
            }
          }
        };
      }
    });
  }
}
