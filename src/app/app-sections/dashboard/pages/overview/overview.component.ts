import { Component, EventEmitter, Input } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  storedSnapshots: any;
  displayName = localStorage.getItem('displayName') ?? '';
  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

  totalAttendeesChart: any;
  totalNewAttendeesChart: any;
  irlAttendeesRateChart: any;
  diplomasRateChart: any;

  latestSnapshot: any;
  attendeesData: any;

  constructor(private analytics: AnalyticsService, private sharedService: SharedService) { }

  ngOnInit(): void {
    // Retrieve all the data from the API
    this.analytics.getLatestSnapshot().subscribe((snapshot) => {
      this.latestSnapshot = snapshot;
    });

    this.analytics.getAllSnapshots().subscribe((snapshots) => {
      this.storedSnapshots = snapshots;
      this.totalAttendeesChart.series = [{
        name: 'Nombre total de participants',
        data: snapshots.attendeesCounts
      }];
      this.totalAttendeesChart.labels = snapshots.dates;

      this.totalNewAttendeesChart.series = [{
        name: 'Nombre de nouvelles inscriptions',
        data: snapshots.numberOfNewAttendees
      }];
      this.totalNewAttendeesChart.labels = snapshots.dates;
    });

    this.analytics.getAllAttendees().subscribe((attendees) => {
      this.attendeesData = attendees;
      this.irlAttendeesRateChart.series = [attendees.irlAttendeesCount, (this.attendeesData.totalAttendeesCount - attendees.irlAttendeesCount)];
      this.irlAttendeesRateChart.labels = ['Présentiel', 'Non-présentiel'];
    });

    this.analytics.getDiplomasAnalytics().subscribe((diplomas) => {
      this.diplomasRateChart.series = diplomas.counts
      this.diplomasRateChart.labels = diplomas.names;
    });

    // Total attendees chart configuration
    this.totalAttendeesChart = {
      series: [],
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0
        }
      },
      colors: ["#9395ff"],
      chart: {
        defaultLocale: 'fr',
        locales: [{
          name: 'fr',
          options: {
            months: ['Janvier', 'Février', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortMonths: ['Jan', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
            days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            shortDays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            toolbar: {
              download: 'Téléchargement SVG',
              selection: 'Séléction',
              selectionZoom: 'Zoom de séléection',
              zoomIn: 'Zoom avant',
              zoomOut: 'Zoom arrière',
              pan: 'Déplacer',
              reset: 'Réinitialiser le zoom',
            }
          }
        }],
        type: "area",
        height: 200,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Nombre total de participants inscrits",
        align: "left",
        style: {
          fontSize: '17.6px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif',
          color: '#2f2a86'
        },
      },
      subtitle: {
        text: "Par jour",
        align: "left",
        style: {
          fontSize: '12px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif'
        },
      },
      labels: [],
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };

    // Total new attendees chart configuration
    this.totalNewAttendeesChart = {
      series: [],
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0
        }
      },
      colors: ["#9395ff"],
      chart: {
        defaultLocale: 'fr',
        locales: [{
          name: 'fr',
          options: {
            months: ['Janvier', 'Février', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortMonths: ['Jan', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sept', 'Oct', 'Nov', 'Dec'],
            days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            shortDays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            toolbar: {
              download: 'Téléchargement SVG',
              selection: 'Séléction',
              selectionZoom: 'Zoom de séléection',
              zoomIn: 'Zoom avant',
              zoomOut: 'Zoom arrière',
              pan: 'Déplacer',
              reset: 'Réinitialiser le zoom',
            }
          }
        }],
        type: "area",
        height: 200,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Nombre de nouvelles inscriptions",
        align: "left",
        style: {
          fontSize: '17.6px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif',
          color: '#2f2a86'
        },
      },
      subtitle: {
        text: "Par jour",
        align: "left",
        style: {
          fontSize: '12px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif'
        },
      },
      labels: [],
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };

    // Irl attendees rate chart configuration
    this.irlAttendeesRateChart = {
      series: [],
      colors: ["#2f2a86", "#9395ff"],
      chart: {
        height: 160,
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
    this.diplomasRateChart = {
      series: [],
      colors: ["#2f2a86", "#9395ff"],
      chart: {
        height: 175,
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

    if (localStorage.getItem('currentTheme') === 'dark') {
      const totalAttendeesChartTitle = this.totalAttendeesChart.title;
      const totalAttendeesChartChart = this.totalAttendeesChart.chart;

      const totalNewAttendeesChartTitle = this.totalNewAttendeesChart.title;
      const totalNewAttendeesChartChart = this.totalNewAttendeesChart.chart;

      const irlAttendeesRateChartChart = this.irlAttendeesRateChart.chart;
      const diplomasRateChartChart = this.diplomasRateChart.chart;

      this.totalAttendeesChart = {
        ...this.totalAttendeesChart,
        chart: {
          ...totalAttendeesChartChart,
          foreColor: '#fff',
        },
        title: {
          ...totalAttendeesChartTitle,
          style: {
            fontSize: '17.6px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            color: "#fff",
          }
        }
      }

      this.totalNewAttendeesChart = {
        ...this.totalNewAttendeesChart,
        chart: {
          ...totalNewAttendeesChartChart,
          foreColor: '#fff',
        },
        title: {
          ...totalNewAttendeesChartTitle,
          style: {
            fontSize: '17.6px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            color: "#fff",
          }
        }
      }

      this.irlAttendeesRateChart = {
        ...this.irlAttendeesRateChart,
        chart: {
          ...irlAttendeesRateChartChart,
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
      const totalAttendeesChartTitle = this.totalAttendeesChart.title;
      const totalAttendeesChartChart = this.totalAttendeesChart.chart;

      const totalNewAttendeesChartTitle = this.totalNewAttendeesChart.title;
      const totalNewAttendeesChartChart = this.totalNewAttendeesChart.chart;

      const irlAttendeesRateChartChart = this.irlAttendeesRateChart.chart;
      const diplomasRateChartChart = this.diplomasRateChart.chart;

      this.totalAttendeesChart = {
        ...this.totalAttendeesChart,
        chart: {
          ...totalAttendeesChartChart,
          foreColor: '#2f2a86',
        },
        title: {
          ...totalAttendeesChartTitle,
          style: {
            fontSize: '17.6px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            color: "#2f2a86",
          }
        }
      }

      this.totalNewAttendeesChart = {
        ...this.totalNewAttendeesChart,
        chart: {
          ...totalNewAttendeesChartChart,
          foreColor: '#2f2a86',
        },
        title: {
          ...totalNewAttendeesChartTitle,
          style: {
            fontSize: '17.6px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            color: "#2f2a86",
          }
        }
      }

      this.irlAttendeesRateChart = {
        ...this.irlAttendeesRateChart,
        chart: {
          ...irlAttendeesRateChartChart,
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
        const totalAttendeesChartTitle = this.totalAttendeesChart.title;
        const totalAttendeesChartChart = this.totalAttendeesChart.chart;

        const totalNewAttendeesChartTitle = this.totalNewAttendeesChart.title;
        const totalNewAttendeesChartChart = this.totalNewAttendeesChart.chart;

        const irlAttendeesRateChartChart = this.irlAttendeesRateChart.chart;
        const diplomasRateChartChart = this.diplomasRateChart.chart;

        this.totalAttendeesChart = {
          ...this.totalAttendeesChart,
          chart: {
            ...totalAttendeesChartChart,
            foreColor: '#fff',
          },
          title: {
            ...totalAttendeesChartTitle,
            style: {
              fontSize: '17.6px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              color: "#fff",
            }
          }
        }

        this.totalNewAttendeesChart = {
          ...this.totalNewAttendeesChart,
          chart: {
            ...totalNewAttendeesChartChart,
            foreColor: '#fff',
          },
          title: {
            ...totalNewAttendeesChartTitle,
            style: {
              fontSize: '17.6px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              color: "#fff",
            }
          }
        }

        this.irlAttendeesRateChart = {
          ...this.irlAttendeesRateChart,
          chart: {
            ...irlAttendeesRateChartChart,
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
        const totalAttendeesChartTitle = this.totalAttendeesChart.title;
        const totalAttendeesChartChart = this.totalAttendeesChart.chart;

        const totalNewAttendeesChartTitle = this.totalNewAttendeesChart.title;
        const totalNewAttendeesChartChart = this.totalNewAttendeesChart.chart;

        const irlAttendeesRateChartChart = this.irlAttendeesRateChart.chart;
        const diplomasRateChartChart = this.diplomasRateChart.chart;

        this.totalAttendeesChart = {
          ...this.totalAttendeesChart,
          chart: {
            ...totalAttendeesChartChart,
            foreColor: '#2f2a86',
          },
          title: {
            ...totalAttendeesChartTitle,
            style: {
              fontSize: '17.6px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              color: "#2f2a86",
            }
          }
        }

        this.totalNewAttendeesChart = {
          ...this.totalNewAttendeesChart,
          chart: {
            ...totalNewAttendeesChartChart,
            foreColor: '#2f2a86',
          },
          title: {
            ...totalNewAttendeesChartTitle,
            style: {
              fontSize: '17.6px',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              color: "#2f2a86",
            }
          }
        }

        this.irlAttendeesRateChart = {
          ...this.irlAttendeesRateChart,
          chart: {
            ...irlAttendeesRateChartChart,
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