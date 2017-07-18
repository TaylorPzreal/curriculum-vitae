import {
  Component,
  OnInit
} from '@angular/core';

import { HomeService } from './home.service';
import { Article } from './article';

@Component({
  selector: 'cv-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [HomeService]
})

export class HomeComponent  implements OnInit {
  public articleList: Article[];
  constructor(private homeService: HomeService) {}

  public ngOnInit() {
    this.initArticle();
  }

  private initArticle() {
    this.homeService.getArticle().subscribe((result: any) => {
      if (2000 === result.code) {
        this.articleList = result.data;
      } else {
        console.error(result.msg);
      }
    }, (error: any) => {
      console.warn(error);
    });
  }

}
