import { Component, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

    // Pie charts configuration
    pieChartOptions: ChartOptions<'pie'> = {
      responsive: true,
      maintainAspectRatio: false,
    };

    // Location chart configuration
    locationChartLabels = [ [ 'Paris' ], [ 'Meaux' ], 'Marseille' ];
    locationChartDatasets = [ {
      data: [ 12, 43, 2 ],
      backgroundColor: [ '#2f2a86', '#d2213c', '#f0b54d'],
    } ];
    locationChartLegend = false;
    locationChartPlugins = [];
    locationColors=[
      {
        backgroundColor: [
          'rgba(110, 114, 20, 1)',
          'rgba(118, 183, 172, 1)',
          'rgba(0, 148, 97, 1)',
          'rgba(129, 78, 40, 1)',
          'rgba(129, 199, 111, 1)'
      ]
      }
    ];

    // Diploma chart configuration
    diplomaChartLabels = [ 'Bac S', 'Bac ES', 'Bac L' ];
    diplomaChartDatasets = [ {
      data: [ 197, 153, 11 ],
      backgroundColor: [ 'green', 'blue', 'red'],
    } ];
    diplomaChartLegend = false;
    diplomaChartPlugins = [];
    diplomaColors=[
      {
        backgroundColor: [
          'rgba(110, 114, 20, 1)',
          'rgba(118, 183, 172, 1)',
          'rgba(0, 148, 97, 1)',
          'rgba(129, 78, 40, 1)',
          'rgba(129, 199, 111, 1)'
      ]
      }
    ];

    constructor() {
    }
  
    lineChartData: ChartConfiguration['data'] = {
      datasets: [
        {
          data: [0, 2, 10, 15, 16, 30, 60, 75, 83, 90, 100, 120, 130, 140, 150],
          label: 'Nombre de visiteurs inscrits',
          backgroundColor: 'rgba(47,42,134,0.7)',
          borderColor: 'rgba(47,42,134,1)',
          pointBackgroundColor: 'rgba(210,33,60,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: 'rgba(210, 33, 60)',
          pointHoverBorderColor: '#fff',
          fill: 'origin',
        },
      ],
      labels: ['01/08/2023', '02/08/2023', '03/08/2023', '04/08/2023', '05/08/2023', '06/08/2023', '07/08/2023', '08/08/2023', '09/08/2023', '10/08/2023', '11/08/2023', '12/08/2023', '13/08/2023', '14/08/2023', '15/08/2023'],
    };
  
    lineChartOptions: ChartConfiguration['options'] = {
      elements: {
        line: {
          tension: 0.4,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        x: {
          grid: {
            drawOnChartArea: false,
          },
          position: 'right',
        },
      },
    };
  
    lineChartType: ChartType = 'line';
  
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
    private static generateNumber(i: number): number {
      return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
    }
  
    public randomize(): void {
      for (let i = 0; i < this.lineChartData.datasets.length; i++) {
        for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
          this.lineChartData.datasets[i].data[j] =
            OverviewComponent.generateNumber(i);
        }
      }
      this.chart?.update();
    }
  
    // events
    public chartClicked({
      event,
      active,
    }: {
      event?: ChartEvent;
      active?: object[];
    }): void {
      console.log(event, active);
    }
  
    public chartHovered({
      event,
      active,
    }: {
      event?: ChartEvent;
      active?: object[];
    }): void {
      console.log(event, active);
    }
  }
