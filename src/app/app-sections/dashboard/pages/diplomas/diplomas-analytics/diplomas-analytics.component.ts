import { SharedService } from 'src/app/services/shared.service';
import { AnalyticsService } from './../../../../../services/analytics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diplomas-analytics',
  templateUrl: './diplomas-analytics.component.html',
  styleUrls: ['./diplomas-analytics.component.scss']
})
export class DiplomasAnalyticsComponent implements OnInit{

  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

  diplomaCategoriesRateChart: any;
  diplomasRateChart: any;

  constructor(private analytics: AnalyticsService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.analytics.getDiplomaCategoriesAnalytics().subscribe((diplomaCategories) => {
      this.diplomaCategoriesRateChart.series = diplomaCategories.counts
      this.diplomaCategoriesRateChart.labels = diplomaCategories.names;
    });

    this.analytics.getDiplomasAnalytics().subscribe((diplomas) => {
      this.diplomasRateChart.series = diplomas.counts
      this.diplomasRateChart.labels = diplomas.names;
    });

    // diplomaCategories rate chart configuration
    this.diplomaCategoriesRateChart = {
      series: [],
      colors: [
        "#2F2A86",
        "#5B4DAF",
        "#8572DA",
        "#B09AFF",
        "#DCC3FF"
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
          breakpoint: 1050,
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
    this.diplomasRateChart = {
      series: [],
      colors: [
        "#2F2A86",
        "#5B4DAF",
        "#8572DA",
        "#B09AFF",
        "#DCC3FF"
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
          breakpoint: 1050,
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

    if (localStorage.getItem('currentTheme') === 'dark') {
      const diplomaCategoriesRateChartChart = this.diplomaCategoriesRateChart.chart;
      const diplomasRateChartChart = this.diplomasRateChart.chart;

      this.diplomaCategoriesRateChart = {
        ...this.diplomaCategoriesRateChart,
        chart: {
          ...diplomaCategoriesRateChartChart,
          foreColor: '#fff',
        }
      }

      this.diplomasRateChart = {
        ...this.diplomasRateChart,
        chart: {
          ...diplomasRateChartChart,
          foreColor: '#fff',
        }
      }

    } else {
      const diplomaCategoriesRateChartChart = this.diplomaCategoriesRateChart.chart;
      const diplomasRateChartChart = this.diplomasRateChart.chart;

      this.diplomaCategoriesRateChart = {
        ...this.diplomaCategoriesRateChart,
        chart: {
          ...diplomaCategoriesRateChartChart,
          foreColor: '#2f2a86',
        }
      }

      this.diplomasRateChart = {
        ...this.diplomasRateChart,
        chart: {
          ...diplomasRateChartChart,
          foreColor: '#2f2a86',
        }
      }
    }

    this.sharedService.themeChanges().subscribe((darkMode: boolean) => {
      if (darkMode) {
        const diplomaCategoriesRateChartChart = this.diplomaCategoriesRateChart.chart;
        const diplomasRateChartChart = this.diplomasRateChart.chart;

        this.diplomaCategoriesRateChart = {
          ...this.diplomaCategoriesRateChart,
          chart: {
            ...diplomaCategoriesRateChartChart,
            foreColor: '#fff',
          }
        }

        this.diplomasRateChart = {
          ...this.diplomasRateChart,
          chart: {
            ...diplomasRateChartChart,
            foreColor: '#fff',
          }
        }

      } else {
        const diplomaCategoriesRateChartChart = this.diplomaCategoriesRateChart.chart;
        const diplomasRateChartChart = this.diplomasRateChart.chart;

        this.diplomaCategoriesRateChart = {
          ...this.diplomaCategoriesRateChart,
          chart: {
            ...diplomaCategoriesRateChartChart,
            foreColor: '#2f2a86',
          }
        }

        this.diplomasRateChart = {
          ...this.diplomasRateChart,
          chart: {
            ...diplomasRateChartChart,
            foreColor: '#2f2a86',
          }
        }
      }
    });
  }
}
