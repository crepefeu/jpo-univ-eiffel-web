import { Diploma } from 'src/app/models/diploma';
import { SharedService } from 'src/app/services/shared.service';
import { AnalyticsService } from './../../../../../services/analytics.service';
import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { defaultErrorToastConfig } from 'src/app/configs/default-toast.configs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-diplomas-analytics',
  templateUrl: './diplomas-analytics.component.html',
  styleUrls: ['./diplomas-analytics.component.scss']
})
export class DiplomasAnalyticsComponent implements OnInit{

  isHandheld = false;

  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

  diplomaCategoriesRateChart: any;
  diplomasRateChart: any;

  diplomas?: Diploma[];

  constructor(private analytics: AnalyticsService,
    private sharedService: SharedService,
    private toast: HotToastService,
    private responsive: BreakpointObserver) { }

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

    this.analytics.getDiplomaCategoriesAnalytics().subscribe({
      next: diplomaCategories => {
      this.diplomaCategoriesRateChart.series = diplomaCategories.counts
      this.diplomaCategoriesRateChart.labels = diplomaCategories.names;
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

    this.analytics.getDiplomasAnalytics().subscribe({
      next: diplomas => {
        this.diplomas = diplomas;
        this.diplomasRateChart.series = diplomas.counts
        this.diplomasRateChart.labels = diplomas.names;
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
          breakpoint: 2000,
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
          breakpoint: 2000,
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
