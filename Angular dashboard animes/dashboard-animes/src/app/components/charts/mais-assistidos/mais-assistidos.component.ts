import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../../services/anime.service';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexStroke,
  ApexFill,
  ApexDataLabels,
  ApexYAxis
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mais-assistidos',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './mais-assistidos.component.html',
  styleUrls: ['./mais-assistidos.component.scss']
})
export class MaisAssistidosComponent implements OnInit {

  animes: any[] = [];

  // Gráfico de barras colorido
  chartSeries: ApexAxisChartSeries = [{
    name: 'Assistindo agora',
    data: []
  }];

  
  chartColors: string[] = [
    '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
    '#3F51B5', '#546E7A', '#D4526E', '#8D5B4C', '#F86624',
    '#2E294E', '#1B998B', '#F46036', '#E2C044', '#662E9B',
    '#4CB944', '#FF6B6B', '#FFC145', '#374785', '#70C1B3'
  ];
  chartDetails: ApexChart = {
    type: 'bar',
    height: 400
  };
  chartXAxis: ApexXAxis = {
    categories: [],
    labels: {
      rotate: -45,
      style: { fontSize: '12px' }
    }
  };
  chartTooltip: ApexTooltip = {
    custom: ({ dataPointIndex }) => {
      const anime = this.animes[dataPointIndex];
      return `
        <div style="padding:10px">
          <strong>${anime.nome_ingles || anime.nome}</strong><br/>
          <b>Nota:</b> ${anime.nota}<br/>
          <b>Gêneros:</b> ${anime.generos}<br/>
          <b>Assistindo:</b> ${anime.assistindo}
        </div>
      `;
    }
  };
  chartTitle: ApexTitleSubtitle = {
    text: 'Top 20 Animes Mais Assistidos',
    align: 'left'
  };

  // Gráfico de pizza: Favoritos, Completos, Planeja Assistir (TOP 5)
  donutSeries: ApexNonAxisChartSeries = [];
  donutLabels: string[] = [];
  donutChart: ApexChart = {
    type: 'donut',
    height: 300
  };
  donutResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }
  ];

  // Gráfico de linha (popularidade visual)
  linhaSeries: ApexAxisChartSeries = [];
  linhaChart: ApexChart = {
    type: 'line',
    height: 300
  };
  linhaXAxis: ApexXAxis = {
    categories: []
  };

  // Gráfico horizontal de "completos"
  completosSeries: ApexAxisChartSeries = [];
  completosChart: ApexChart = {
    type: 'bar',
    height: 300
  };
  completosXAxis: ApexXAxis = {
    categories: [],
    labels: {
      style: { fontSize: '10px' }
    }
  };
  completosYAxis: ApexYAxis = {
    title: {
      text: 'Animes'
    }
  };
  completosOptions: Partial<ApexChart> = {
    stacked: true
  };

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeService.getAnimes().subscribe((animes) => {
      this.animes = animes
        .sort((a, b) => b.assistindo - a.assistindo)
        .slice(0, 20);

      // Chart principal
      this.chartSeries = [{
        name: 'Assistindo agora',
        data: this.animes.map(a => a.assistindo)
      }];
      this.chartXAxis.categories = this.animes.map(a => a.nome);

      // Donut (TOP 5 favoritos + completos + planeja assistir)
      const top5 = this.animes.slice(0, 5);
      this.donutLabels = top5.map(a => a.nome);
      this.donutSeries = top5.map(a => (a.favoritos + a.completos + a.planeja_assistir));

      // Linha de popularidade (fictícia para visual)
      this.linhaSeries = [{
        name: 'Popularidade (quanto menor, melhor)',
        data: this.animes.map(a => a.popularidade)
      }];
      this.linhaXAxis.categories = this.animes.map(a => a.nome);

      // Barras horizontais de completados
      this.completosSeries = [{
        name: 'Completos',
        data: this.animes.slice(0, 10).map(a => a.completos)
      }];
      this.completosXAxis.categories = this.animes.slice(0, 10).map(a => a.nome);
    });
  }
}
