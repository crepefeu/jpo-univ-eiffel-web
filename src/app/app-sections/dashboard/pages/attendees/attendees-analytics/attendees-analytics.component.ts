import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import franceMap from "@highcharts/map-collection/countries/fr/fr-all-all.topo.json";
import idfMap from "@highcharts/map-collection/countries/fr/fr-idf-all.topo.json";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { SharedService } from 'src/app/services/shared.service';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-attendees-analytics',
  templateUrl: './attendees-analytics.component.html',
  styleUrls: ['./attendees-analytics.component.scss']
})
export class AttendeesAnalyticsComponent implements OnInit {

  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

  // Highcharts configuration
  chartConstructor: string = "mapChart";

  idfMap: typeof Highcharts = Highcharts;
  idfChartOptions?: Highcharts.Options;

  frenchDepMap: typeof Highcharts = Highcharts;
  frenchDepChartOptions?: Highcharts.Options;

  constructor(
    private sharedService: SharedService,
    private analytics: AnalyticsService
  ) { }

  ngOnInit(): void {
    // retrieve map data from API
    this.analytics.getMapAnalytics().subscribe({
      next: mapAnalytics => {
        this.frenchDepChartOptions = {
          series: [
            {
              type: "map",
              data: mapAnalytics
            }
          ]
        }

        this.idfChartOptions = {
          series: [
            {
              type: "map",
              data: mapAnalytics
            }
          ]
        }
      },
      error: err => console.error('An error occurred :', err)
    });

    // French department map configuration
    this.frenchDepChartOptions = {
      chart: {
        map: franceMap,
        style: {
          fontFamily: "Inter, sans-serif",
        },
        backgroundColor: "#fff"
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
          data: []
        }
      ]
    };

    // idf map configuration
    this.idfChartOptions = {
      chart: {
        map: idfMap,
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
          data: []
        }
      ]
    };

    if (localStorage.getItem('currentTheme') === 'dark') {
      const franceDepChart = this.frenchDepChartOptions.chart;
      const idfChart = this.idfChartOptions.chart;

      this.frenchDepChartOptions = {
        ...this.frenchDepChartOptions,
        chart: {
          ...franceDepChart,
          backgroundColor: "#393939",
        }
      }

      this.idfChartOptions = {
        ...this.idfChartOptions,
        chart: {
          ...idfChart,
          backgroundColor: "#393939",
        }
      }
    } else {
      const franceDepChart = this.frenchDepChartOptions.chart;
      const idfChart = this.idfChartOptions.chart;

      this.frenchDepChartOptions = {
        ...this.frenchDepChartOptions,
        chart: {
          ...franceDepChart,
          backgroundColor: "#fff",
        }
      }

      this.idfChartOptions = {
        ...this.idfChartOptions,
        chart: {
          ...idfChart,
          backgroundColor: "#fff",
        }
      }
    }

    this.sharedService.themeChanges().subscribe((isDarkMode: boolean) => {
      if (isDarkMode) {
        const franceDepChart = this.frenchDepChartOptions?.chart;
        const idfChart = this.idfChartOptions?.chart;

        this.frenchDepChartOptions = {
          ...this.frenchDepChartOptions,
          chart: {
            ...franceDepChart,
            backgroundColor: "#393939",
          }
        }

        this.idfChartOptions = {
          ...this.idfChartOptions,
          chart: {
            ...idfChart,
            backgroundColor: "#393939",
          }
        }
      } else {
        const franceDepChart = this.frenchDepChartOptions?.chart;
        const idfChart = this.idfChartOptions?.chart;

        this.frenchDepChartOptions = {
          ...this.frenchDepChartOptions,
          chart: {
            ...franceDepChart,
            backgroundColor: "#fff",
          }
        }

        this.idfChartOptions = {
          ...this.idfChartOptions,
          chart: {
            ...idfChart,
            backgroundColor: "#fff",
          }
        }
      }
    });
  }
}
