import {
  Component,
  inject,
  computed,
  effect,
  ElementRef,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { NbaApiService } from '../../core/services/nba-api.service';
import { Shot, ShotChartData } from '../../core/models/player.schema';

@Component({
  selector: 'app-shot-chart',
  imports: [CommonModule],
  templateUrl: './shot-chart.component.html',
  styleUrl: './shot-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShotChartComponent {
  private nbaApi = inject(NbaApiService);
  private chartContainer = viewChild<ElementRef<HTMLDivElement>>('chartContainer');

  isLoading = computed(() => this.nbaApi.isLoadingShotChart());
  shotData = computed(() => this.nbaApi.shotChart());
  hasData = computed(() => !!this.shotData() && this.shotData()!.shots.length > 0);

  constructor() {
    // Re-render chart when data changes
    effect(() => {
      const data = this.shotData();
      const container = this.chartContainer();

      if (data && container) {
        this.renderChart(container.nativeElement, data);
      }
    });
  }

  private renderChart(container: HTMLDivElement, data: ShotChartData): void {
    // Clear previous chart
    d3.select(container).selectAll('*').remove();

    const width = 500;
    const height = 470;

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', 'shot-chart');

    // Draw basketball court
    this.drawCourt(svg, width, height);

    // Plot shots
    if (data.shots && data.shots.length > 0) {
      svg
        .selectAll('.shot')
        .data(data.shots)
        .enter()
        .append('circle')
        .attr('class', 'shot')
        .attr('cx', (d: Shot) => this.scaleX(d.x, width))
        .attr('cy', (d: Shot) => this.scaleY(d.y, height))
        .attr('r', 5)
        .attr('fill', (d: Shot) => (d.made ? 'var(--accent-primary)' : '#ff4d4d'))
        .attr('opacity', 0.8)
        .attr('stroke', 'rgba(255, 255, 255, 0.2)')
        .attr('stroke-width', 1);
    }
  }

  private drawCourt(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    width: number,
    height: number,
  ): void {
    const courtGroup = svg.append('g').attr('class', 'court');

    // Draw half-court outline
    courtGroup
      .append('rect')
      .attr('x', 25)
      .attr('y', 25)
      .attr('width', width - 50)
      .attr('height', height - 50)
      .attr('fill', 'none')
      .attr('stroke', 'var(--border-color)')
      .attr('stroke-width', 2);

    // Draw basket (circle)
    courtGroup
      .append('circle')
      .attr('cx', width / 2)
      .attr('cy', 50)
      .attr('r', 7.5)
      .attr('fill', 'none')
      .attr('stroke', 'var(--accent-secondary)')
      .attr('stroke-width', 2);

    // Draw free throw line
    courtGroup
      .append('line')
      .attr('x1', 100)
      .attr('y1', 170)
      .attr('x2', width - 100)
      .attr('y2', 170)
      .attr('stroke', 'var(--border-color)')
      .attr('stroke-width', 2);

    // Draw three-point arc (simplified)
    const arcPath = d3
      .arc()
      .innerRadius(237)
      .outerRadius(239)
      .startAngle(-Math.PI / 2.2)
      .endAngle(Math.PI / 2.2);

    courtGroup
      .append('path')
      .attr('d', arcPath({}) as string)
      .attr('transform', `translate(${width / 2}, 50)`)
      .attr('fill', 'var(--border-color)');
  }

  private scaleX(x: number, width: number): number {
    // Transform x coordinate (assuming x is in feet from center)
    return ((x + 25) * (width - 50)) / 50 + 25;
  }

  private scaleY(y: number, height: number): number {
    // Transform y coordinate (assuming y is in feet from baseline)
    return height - ((y * (height - 50)) / 47 + 25);
  }
}
