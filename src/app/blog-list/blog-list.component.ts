import 'highlight.js/styles/atom-one-dark.css';
import * as jQuery from 'jquery';

import * as hljs from 'highlight.js';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss']
})

export class BlogListComponent implements OnInit {
  public cardhtml: string = `
<div class="containerX">
  <div class="container">
    <div fxFlex fxLayout="space-around stretch">
        <md-card class="box-shadow-dark-3" fxFlex="32%" fxFlex.lt-sm="100%" fxLayout="column">
          <md-card-header>
            <md-card-title>Card布局</md-card-title>
          </md-card-header>

          <md-card-content>
            content
          </md-card-content>
        </md-card>
    </div>
  </div>
</div>`;


  public cssGradienst: string = `
 $color1: rgba(142, 246, 228, .9);
 $color2: rgba(51, 204, 204, .9);

 .css-gradient {
   background: linear-gradient(to bottom left, $color1, $color2);
 }`;


  public ngOnInit() {

    // hljs.initHighlightingOnLoad();

    jQuery(document).ready(() => {
      jQuery('pre code').each((i, block) => {
        hljs.highlightBlock(block);
      });
    });

    // this.initBlogList();
  }

  private initBlogList() {

    console.warn('blog list');
  }

}
