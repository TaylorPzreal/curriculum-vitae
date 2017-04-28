import * as d3 from 'd3';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'datav',
  templateUrl: 'datav.component.html',
  styleUrls: ['datav.component.scss']
})

export class DatavComponent implements OnInit {

  public ngOnInit() {

    this.initKnowledge();
  }

  public initKnowledge(): void {
    console.warn('777');

    // SVG 图形大小
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    const knowledgeDom: Element = document.querySelector('#knowledge');

    const svg = d3.select('#knowkedge')
      .attr('width', width)
      .attr('height', height);

      // let g = svg.append('g').attr('transform', `translate(${width / 2 + 40}, ${height / 2 + 90})`);
  }

}
