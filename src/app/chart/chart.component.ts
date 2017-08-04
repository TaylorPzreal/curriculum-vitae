import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as $ from 'jquery';
import { Chart } from 'chart.js';

interface IChart {
  type: string;
  data: {};
  options: {};
}

@Component({
  selector: 'cv-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges {
  public ctxid: number;

  @Input() private chartData: IChart;
  private ctx: JQuery<HTMLElement>;

  constructor() {
    this.chartData = {
      type: null,
      data: null,
      options: null
    };

  }

  public ngOnChanges(changes: SimpleChanges) {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add 'implements OnChanges' to the class.
    if (this.chartData && this.chartData.data) {
      this.initChart();
    }
  }

  private initChart(): void {
    this.ctxid = (new Date()).valueOf();

    // console.warn('initchart', this.ctxid);
    const canvas = document.createElement('canvas');
    // document.getElementsByName('cv-chart')[0].appendChild(canvas);
    document.getElementById('canvas-container').appendChild(canvas);
    this.ctx = $(canvas);
    this.ctx.width(this.ctx.parent().width());
    this.ctx.height(460);

    const myChart = new Chart(this.ctx, {
      type: this.chartData.type,
      data: this.chartData.data,
      options: this.chartData.options
    });
  }
}
