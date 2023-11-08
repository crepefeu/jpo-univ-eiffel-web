import { Component, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as Highcharts from 'highcharts/highmaps';
import franceMap from "@highcharts/map-collection/countries/fr/fr-all-all.topo.json";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  // Highcharts configuration
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";

  chartOptions: Highcharts.Options = {
    chart: {
      map: franceMap,
      style: {
        fontFamily: "Inter, sans-serif",
      }
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    title: {
      text: "",
      style: {
        fontSize: "18px",
        color: "#2f2a86"
      },
    },
    subtitle: {
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0,
      minColor: "#bbb9e3",
      maxColor: "#2f2a86",
    },
    series: [
      {
        type: "map",
        name: "Visiteurs",
        states: {
          hover: {
            color: "#d2213c"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data: [
          ['fr-bre-mb', 10], ['fr-pdl-vd', 11], ['fr-occ-ad', 12],
          ['fr-pac-vc', 13], ['fr-ges-hm', 14], ['fr-ges-mr', 15],
          ['fr-hdf-no', 16], ['fr-occ-hp', 17], ['fr-cvl-in', 18],
          ['fr-naq-vn', 19], ['fr-naq-dd', 20], ['fr-naq-cm', 21],
          ['fr-pac-am', 22], ['fr-pac-vr', 23], ['fr-pac-ap', 24],
          ['fr-ara-ai', 25], ['fr-hdf-as', 26], ['fr-pac-bd', 27],
          ['fr-occ-av', 28], ['fr-occ-ga', 29], ['fr-ges-ab', 30],
          ['fr-bfc-co', 31], ['fr-bfc-sl', 32], ['fr-cvl-ch', 33],
          ['fr-naq-cr', 34], ['fr-pdl-ml', 35], ['fr-naq-ds', 36],
          ['fr-naq-ct', 37], ['fr-ara-dm', 38], ['fr-ara-ah', 39],
          ['fr-nor-eu', 40], ['fr-idf-es', 41], ['fr-cvl-el', 42],
          ['fr-occ-hg', 43], ['fr-idf-hd', 44], ['fr-naq-hv', 45],
          ['fr-pdl-st', 46], ['fr-cvl-il', 47], ['fr-ara-is', 48],
          ['fr-bfc-ju', 49], ['fr-bfc-hn', 50], ['fr-ara-lr', 51],
          ['fr-occ-tg', 52], ['fr-occ-lo', 53], ['fr-naq-lg', 54],
          ['fr-occ-lz', 55], ['fr-bre-iv', 56], ['fr-ges-mm', 57],
          ['fr-ges-ms', 58], ['fr-bfc-ni', 59], ['fr-naq-cz', 60],
          ['fr-ara-pd', 61], ['fr-occ-ge', 62], ['fr-naq-pa', 63],
          ['fr-ara-sv', 64], ['fr-idf-se', 65], ['fr-idf-vp', 66],
          ['fr-idf-ss', 67], ['fr-idf-vm', 68], ['fr-hdf-so', 69],
          ['fr-bfc-tb', 70], ['fr-bfc-db', 71], ['fr-idf-vo', 72],
          ['fr-ges-vg', 73], ['fr-idf-yv', 74], ['fr-cvl-lc', 75],
          ['fr-cor-cs', 76], ['fr-bre-fi', 77], ['fr-cor-hc', 78],
          ['fr-nor-mh', 79], ['fr-ges-an', 80], ['fr-occ-ag', 81],
          ['fr-ges-br', 82], ['fr-nor-cv', 83], ['fr-ara-cl', 84],
          ['fr-bre-ca', 85], ['fr-naq-gi', 86], ['fr-ges-hr', 87],
          ['fr-ara-hs', 88], ['fr-occ-he', 89], ['fr-naq-ld', 90],
          ['fr-pdl-la', 91], ['fr-ges-mo', 92], ['fr-nor-or', 93],
          ['fr-hdf-pc', 94], ['fr-occ-po', 95], ['fr-pdl-my', 96],
          ['fr-nor-sm', 97], ['fr-bfc-yo', 98], ['fr-ara-al', 99],
          ['fr-ara-hl', 100], ['fr-pac-ha', 101], ['fr-cvl-lt', 102],
          ['fr-hdf-oi', 103], ['fr-ara-rh', 104], ['fr-occ-ta', 105], ['null', 106],
          ['fr-lre-re', 107], ['fr-may-yt', 108], ['fr-gf-gf', 109],
          ['fr-mq-mq', 110], ['fr-gua-gp', 111]
      ]
      }
    ]
  };

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
          pointBackgroundColor: '#fff',
          pointBorderColor: 'rgba(47,42,134,1)',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(47,42,134,1)',
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
