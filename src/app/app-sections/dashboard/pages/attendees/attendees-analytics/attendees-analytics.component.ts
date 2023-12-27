import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import franceMap from "@highcharts/map-collection/countries/fr/fr-all-all.topo.json";
import idfMap from "@highcharts/map-collection/countries/fr/fr-idf-all.topo.json";
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

  virtualTourSatisfactionRateChart: any;
  websiteTourSatisfactionRateChart: any;

  constructor(
    private sharedService: SharedService,
    private analytics: AnalyticsService
  ) { }

  ngOnInit(): void {
    // retrieve satisfaction rate data from API
    this.analytics.getSatisfactionAnalytics().subscribe((satisfactionAnalytics) => {
      this.virtualTourSatisfactionRateChart.labels = satisfactionAnalytics.labels;
      this.websiteTourSatisfactionRateChart.labels = satisfactionAnalytics.labels;

      this.virtualTourSatisfactionRateChart.series = satisfactionAnalytics.virtualTourSatisfaction
      this.websiteTourSatisfactionRateChart.series = satisfactionAnalytics.websiteSatisfaction
    });


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

    // diplomaCategories rate chart configuration
    this.virtualTourSatisfactionRateChart = {
      series: [],
      colors: [
        "#29c66b",
        "#ffa600",
        "#de3c3c"
      ],
      chart: {
        height: 170,
        type: "donut",
      },
      legend: {
        show: this.userPreferences.showLegendOnCharts,
        position: "right"
      },
      dataLabels: {
        enabled: this.userPreferences.showPercentagesOnCharts,
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
    };

    // Diplomas rate chart configuration
    this.websiteTourSatisfactionRateChart = {
      series: [],
      colors: [
        "#29c66b",
        "#ffa600",
        "#de3c3c"
      ],
      chart: {
        height: 170,
        type: "donut"
      },
      legend: {
        show: this.userPreferences.showLegendOnCharts
      },
      dataLabels: {
        enabled: this.userPreferences.showPercentagesOnCharts,
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
    };

    this.sharedService.themeChanges().subscribe((darkMode: boolean) => {
      if (darkMode) {
        const virtualTourSatisfactionRateChartChart = this.virtualTourSatisfactionRateChart.chart;
        const websiteTourSatisfactionRateChartChart = this.websiteTourSatisfactionRateChart.chart;

        this.virtualTourSatisfactionRateChart = {
          ...this.virtualTourSatisfactionRateChart,
          chart: {
            ...virtualTourSatisfactionRateChartChart,
            foreColor: '#fff',
          }
        }

        this.websiteTourSatisfactionRateChart = {
          ...this.websiteTourSatisfactionRateChart,
          chart: {
            ...websiteTourSatisfactionRateChartChart,
            foreColor: '#fff',
          }
        }

      } else {
        const virtualTourSatisfactionRateChartChart = this.virtualTourSatisfactionRateChart.chart;
        const websiteTourSatisfactionRateChartChart = this.websiteTourSatisfactionRateChart.chart;

        this.virtualTourSatisfactionRateChart = {
          ...this.virtualTourSatisfactionRateChart,
          chart: {
            ...virtualTourSatisfactionRateChartChart,
            foreColor: '#2f2a86',
          }
        }

        this.websiteTourSatisfactionRateChart = {
          ...this.websiteTourSatisfactionRateChart,
          chart: {
            ...websiteTourSatisfactionRateChartChart,
            foreColor: '#2f2a86',
          }
        }
      }
    });

    // French department map configuration
    this.frenchDepChartOptions = {
      chart: {
        animation: false,
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
        animation: false,
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
      const virtualTourSatisfactionRateChartChart = this.virtualTourSatisfactionRateChart.chart;
      const websiteTourSatisfactionRateChartChart = this.websiteTourSatisfactionRateChart.chart;
      const franceDepChart = this.frenchDepChartOptions.chart;
      const idfChart = this.idfChartOptions.chart;

      this.virtualTourSatisfactionRateChart = {
        ...this.virtualTourSatisfactionRateChart,
        chart: {
          ...virtualTourSatisfactionRateChartChart,
          foreColor: '#fff',
        }
      }

      this.websiteTourSatisfactionRateChart = {
        ...this.websiteTourSatisfactionRateChart,
        chart: {
          ...websiteTourSatisfactionRateChartChart,
          foreColor: '#fff',
        }
      }

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
      const virtualTourSatisfactionRateChartChart = this.virtualTourSatisfactionRateChart.chart;
      const websiteTourSatisfactionRateChartChart = this.websiteTourSatisfactionRateChart.chart;
      const franceDepChart = this.frenchDepChartOptions.chart;
      const idfChart = this.idfChartOptions.chart;

      this.virtualTourSatisfactionRateChart = {
        ...this.virtualTourSatisfactionRateChart,
        chart: {
          ...virtualTourSatisfactionRateChartChart,
          foreColor: '#2f2a86',
        }
      }

      this.websiteTourSatisfactionRateChart = {
        ...this.websiteTourSatisfactionRateChart,
        chart: {
          ...websiteTourSatisfactionRateChartChart,
          foreColor: '#2f2a86',
        }
      }

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
        const virtualTourSatisfactionRateChartChart = this.virtualTourSatisfactionRateChart.chart;
        const websiteTourSatisfactionRateChartChart = this.websiteTourSatisfactionRateChart.chart;
        const franceDepChart = this.frenchDepChartOptions?.chart;
        const idfChart = this.idfChartOptions?.chart;

        this.virtualTourSatisfactionRateChart = {
          ...this.virtualTourSatisfactionRateChart,
          chart: {
            ...virtualTourSatisfactionRateChartChart,
            foreColor: '#fff',
          }
        }

        this.websiteTourSatisfactionRateChart = {
          ...this.websiteTourSatisfactionRateChart,
          chart: {
            ...websiteTourSatisfactionRateChartChart,
            foreColor: '#fff',
          }
        }

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
        const virtualTourSatisfactionRateChartChart = this.virtualTourSatisfactionRateChart.chart;
        const websiteTourSatisfactionRateChartChart = this.websiteTourSatisfactionRateChart.chart;
        const franceDepChart = this.frenchDepChartOptions?.chart;
        const idfChart = this.idfChartOptions?.chart;

        this.virtualTourSatisfactionRateChart = {
          ...this.virtualTourSatisfactionRateChart,
          chart: {
            ...virtualTourSatisfactionRateChartChart,
            foreColor: '#2f2a86',
          }
        }

        this.websiteTourSatisfactionRateChart = {
          ...this.websiteTourSatisfactionRateChart,
          chart: {
            ...websiteTourSatisfactionRateChartChart,
            foreColor: '#2f2a86',
          }
        }

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
