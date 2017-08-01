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
    console.warn('initchart');
    this.ctx = $('canvas');
    this.ctx.width(this.ctx.parent().width());
    this.ctx.height(300);
    console.warn(this.ctx);
    const myChart = new Chart(this.ctx, {
      type: this.chartData.type,
      data: this.chartData.data,
      options: this.chartData.options
    });
  }
}
