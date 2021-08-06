import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {select} from 'd3-selection';
import {color} from 'd3-color';
import {pie, arc} from 'd3-shape';

@customElement('fds-pie-chart')
export class FdsPieChart extends LitElement {
  @property()
  dataSource:object[];

  @query('#chart')
  _chart:any;

  radius:any = Math.min(200, 200) / 2 * 0.8;
  arcLabel = arc().innerRadius(this.radius).outerRadius(this.radius);
  arc: any = arc()
    .innerRadius(0)
    .outerRadius(Math.min(200, 200) / 2 - 1);

  constructor() {
    super();
    this.dataSource = [];
  }

  attributeChangedCallback(name: string, oldval: any, newval: any) {
    console.log('attribute change: ', name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    return html`
      <svg id="chart"></svg>
    `;
  }

  firstUpdated(changedProperties: any) {
    this.buildChart(this._chart);
  }

  buildChart(chart: any) {
    const arcs = pie()
      .value((d:any) => d.value as number)(this.dataSource as any);
    const svg = select(chart)
      .attr("viewBox", [-200 / 2, -200 / 2, 200, 200] as any);

    console.log(arcs);

    svg.append("g")
      .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", (d:any) => color(d.data.tag) as any)
      .attr("d", this.arc)
    .append("title")
      .text((d:any) => `${d.data.tag}`);

    svg .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", (d:any) => `translate(${this.arcLabel.centroid(d)})`)
      .call((text:any) => text.append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text((d:any) => d.data.tag))
      .call((text:any) => text.filter((d:any) => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text((d:any) => d.data.value));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-pie-chart': FdsPieChart;
  }
}