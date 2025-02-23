import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import franceMap from "@highcharts/map-collection/countries/fr/fr-all-all.topo.json";
import idfMap from "@highcharts/map-collection/countries/fr/fr-idf-all.topo.json";
import { SharedService } from 'src/app/services/shared.service';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HotToastService } from '@ngneat/hot-toast';
import { defaultErrorToastConfig } from 'src/app/configs/default-toast.configs';

@Component({
  selector: 'app-attendees-analytics',
  templateUrl: './attendees-analytics.component.html',
  styleUrls: ['./attendees-analytics.component.scss']
})
export class AttendeesAnalyticsComponent implements OnInit {

  isHandheld = false;

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
    private analytics: AnalyticsService,
    private responsive: BreakpointObserver,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.responsive.observe(['(max-width: 820px)']).subscribe({
      next: data => {
        if (data.matches) {
          this.isHandheld = true;
        } else {
          this.isHandheld = false;
        }
      }
    });

    // retrieve satisfaction rate data from API
    this.analytics.getSatisfactionAnalytics().subscribe({
      next: satisfactionAnalytics => {
      this.virtualTourSatisfactionRateChart.labels = satisfactionAnalytics.labels;
      this.websiteTourSatisfactionRateChart.labels = satisfactionAnalytics.labels;

      this.virtualTourSatisfactionRateChart.series = satisfactionAnalytics.virtualTourSatisfaction
      this.websiteTourSatisfactionRateChart.series = satisfactionAnalytics.websiteSatisfaction
      },
      error: err => {
        if (this.isHandheld) {
          this.toast.error('Une erreur est survenue', {
            ...defaultErrorToastConfig,
            style: {
              ...defaultErrorToastConfig.style,
              fontSize: '0.8rem',
              position: 'absolute',
              bottom: '65px',
            }
          });
        } else {
          this.toast.error('Une erreur est survenue', defaultErrorToastConfig);
        }
      }
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
      error: err => {
        if (this.isHandheld) {
          this.toast.error('Une erreur est survenue', {
            ...defaultErrorToastConfig,
            style: {
              ...defaultErrorToastConfig.style,
              fontSize: '0.8rem',
              position: 'absolute',
              bottom: '65px',
            }
          });
        } else {
          this.toast.error('Une erreur est survenue', defaultErrorToastConfig);
        }
      }
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
        height: 200,
        type: "donut"
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
          breakpoint: 426,
          options: {
            chart: {
              height: 200,
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
        height: 200,
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
          breakpoint: 426,
          options: {
            chart: {
              height: 200,
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
          name: "Participants",
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
          data: [null]
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
          name: "Participants",
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
          data: [null]
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
          backgroundColor: "rgb(31, 31, 33)",
        },
        tooltip: {
          backgroundColor: '#1d1d1d',
          style: {
            color: '#fff',
          }
        }
      }

      this.idfChartOptions = {
        ...this.idfChartOptions,
        chart: {
          ...idfChart,
          backgroundColor: "rgb(31, 31, 33)",
        },
        tooltip: {
          backgroundColor: '#1d1d1d',
          style: {
            color: '#fff',
          }
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
        },
        tooltip: {
          backgroundColor: '#fff',
          style: {
            color: '#000',
          }
        }
      }

      this.idfChartOptions = {
        ...this.idfChartOptions,
        chart: {
          ...idfChart,
          backgroundColor: "#fff",
        },
        tooltip: {
          backgroundColor: '#fff',
          style: {
            color: '#000',
          }
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
            backgroundColor: "rgb(31, 31, 33)",
          },
          tooltip: {
            backgroundColor: '#1d1d1d',
            style: {
              color: '#fff',
            }
          }
        }

        this.idfChartOptions = {
          ...this.idfChartOptions,
          chart: {
            ...idfChart,
            backgroundColor: "rgb(31, 31, 33)",
          },
          tooltip: {
            backgroundColor: '#1d1d1d',
            style: {
              color: '#fff',
            }
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
          },
          tooltip: {
            backgroundColor: '#fff',
            style: {
              color: '#000',
            }
          }
        }

        this.idfChartOptions = {
          ...this.idfChartOptions,
          chart: {
            ...idfChart,
            backgroundColor: "#fff",
          },
          tooltip: {
            backgroundColor: '#fff',
            style: {
              color: '#000',
            }
          }
        }
      }
    });
  }
}
