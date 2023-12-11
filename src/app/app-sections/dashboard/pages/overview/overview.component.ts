import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.development';
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

import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  displayName = localStorage.getItem('displayName') ?? '';
  userPreferences = JSON.parse(localStorage.getItem('userPreferences') ?? '{}');

  // Highcharts configuration
  chartConstructor: string = "mapChart";

  frenchDepMap: typeof Highcharts = Highcharts;
  frenchDepChartOptions: Highcharts.Options;

  idfMap: typeof Highcharts = Highcharts;
  idfChartOptions: Highcharts.Options;

  totalAttendeesChart: any;
  totalNewAttendeesChart: any;
  irlAttendeesRateChart: any;
  diplomasRateChart: any;

  latestSnapshot: any;
  attendeesData: any;

  constructor(private analytics: AnalyticsService) {

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
          ],
        }
      ]
    };

    // French department map configuration
    this.frenchDepChartOptions = {
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
          ],
        }
      ]
    };
  }

  ngOnInit(): void {
    // Retrieve all the data from the API
    this.analytics.getLatestSnapshot().subscribe((snapshot) => {
      this.latestSnapshot = snapshot;
    });

    this.analytics.getAllSnapshots().subscribe((snapshots) => {
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
        type: "donut"
      },
      legend: {
        show: this.userPreferences.showLegendOnCharts,
        position: "right",
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
  }
}