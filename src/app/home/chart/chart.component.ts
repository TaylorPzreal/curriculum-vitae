import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as $ from 'jquery';
import { Chart } from 'chart.js';

interface IChart {
  data: number[];
  labels: string[];
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
      data: null,
      labels: null
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
    this.ctxid = new Date().valueOf();

    const canvas = document.createElement('canvas');
    document.getElementById('canvas-container').appendChild(canvas);
    this.ctx = $(canvas);
    this.ctx.width(this.ctx.parent().width());
    this.ctx.height(420);

    const myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.chartData.labels.reverse(),
        datasets: [
          {
            label: 'stars',
            data: this.chartData.data.reverse(),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 159, 64, 0.4)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 159, 64, 0.4)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Github JS Top15',
          fontColor: 'rgba(255, 255, 255, 0.8)'
        },
        tooltips: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          titleFontColor: 'rgba(1, 72, 104, 0.8)',
          bodyFontColor: 'rgba(2, 120, 174, 0.8)'
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255, 255, 255, 0.6)'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255, 255, 255, 0.6)'
              }
            }
          ]
        },
        legend: {
          labels: {
            fontColor: 'rgba(255, 255, 255, 0.6)'
          }
        }
      }
    });
  }
}
