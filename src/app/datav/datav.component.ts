import * as d3 from 'd3';
import {
  Component,
  OnInit
} from '@angular/core';

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

    // SVG 图形大小
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    const svg = d3.select('#knowledge').append('svg')
      .attr('width', width - 120)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const tree = d3.tree()
      .size([360, 500])
      .separation((a, b) => {
        return (a.parent === b.parent ? 1 : 2) / a.depth;
      });

    const JsonData = {
      name: '我的大前端',
      children: [{
        name: 'JavaScript',
        children: [{
          name: 'jQuery'
        }, {
          name: 'Angularjs'
        }, {
          name: 'Angular'
        }]
      }, {
        name: 'HTML5',
        children: [{
            name: 'SVG'
          },
          {
            name: 'Canvas'
          }
        ]
      }, {
        name: 'CSS3',
        children: [{
          name: 'Sass'
        }, {
          name: 'postCss'
        }]
      }]
    };

    // const stratify = d3.stratify()
    //     .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

    const root = d3.hierarchy(JsonData);
    // root.sum((d) => (d.value)).sort((a, b) => b.value - a.value);
    tree(root);

    function project(x: number, y: number) {
      const angle = (x - 90) / 180 * Math.PI;
      const radius = y;
      return [radius * Math.cos(angle), radius * Math.sin(angle)];
    }

    // const link = g.selectAll('.link')
    //   .data(root.descendants().slice(1))
    //   .enter().append('path')
    //   .attr('class', 'link')
    //   .attr('d', (d) => {
    //     return 'M' + project(d.x, d.y) +
    //       'C' + project(d.x, (d.y + d.parent.y) / 2) +
    //       ' ' + project(d.parent.x, (d.y + d.parent.y) / 2) +
    //       ' ' + project(d.parent.x, d.parent.y);
    //   });


    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', (d) => {
        return 'node' + (d.children ? ' node--internal' : ' node--leaf');
      })
      .attr('transform', (d) => {
        return 'translate(' + project(d.x, d.y) + ')';
      });

    node.append('circle')
      .attr('r', 2.5);

    node.append('text')
      .attr('dy', '.31em')
      .attr('x', (d) => {
        return d.x < 180 === !d.children ? 6 : -6;
      })
      .style('text-anchor', (d) => {
        return d.x < 180 === !d.children ? 'start' : 'end';
      })
      .attr('transform', (d) => {
        return 'rotate(' + (d.x < 180 ? d.x - 90 : d.x + 90) + ')';
      })
      .text((d) => {
        return d.data.name;
      });
  }

}