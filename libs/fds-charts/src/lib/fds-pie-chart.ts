import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {select} from 'd3-selection';
import {pie, arc} from 'd3-shape';
import {scaleOrdinal} from 'd3-scale';
import {quantize} from 'd3-interpolate';
import {interpolateSpectral} from 'd3-scale-chromatic';

@customElement('fds-pie-chart')
export class FdsPieChart extends LitElement {
  @property({type: Array})
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
    const pieGen = pie().sort(null).value((d:any) => d.value as number);
    const arcs = pieGen(this.dataSource as any);
      // .value((d:any) => d.value as number)(this.dataSource as any);
    const color = scaleOrdinal()
      .domain(this.dataSource.map((d:any) => d.tag))
      .range(quantize(t => interpolateSpectral(t * 0.8 + 0.1), this.dataSource.length).reverse())
    const svg = select(chart)
      .attr("viewBox", "-100 -100 200 200");

    console.log(arcs);

    svg.append("g")
      .attr("stroke", "white")
      .attr("stroke-opacity", 0)
    .selectAll("path")
    .data(arcs as any)
    .join("path")
      .attr("fill", (d:any) => color(d.data.tag) as any)
      .attr("d", this.arc)
    .append("title")
      .text((d:any) => `${d.data.tag}`);

    svg .append("g")
      .attr("font-family", "Roboto")
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