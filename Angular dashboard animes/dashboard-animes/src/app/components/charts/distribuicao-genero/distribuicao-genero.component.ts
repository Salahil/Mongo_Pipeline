import { Component, OnInit } from '@angular/core';
import {
  ApexOptions,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ChartComponent
} from "ng-apexcharts";
import {AnimeService} from '../../../services/anime.service';

@Component({
  selector: 'app-distribuicao-genero',
  templateUrl: './distribuicao-genero.component.html',
  standalone: true,
  imports: [
    ChartComponent
  ],
  styleUrls: ['./distribuicao-genero.component.scss']
})
export class DistribuicaoGeneroComponent implements OnInit {
  animes: any[] = [];

  // Gráfico de Pizza (Distribuição de Animes por Gênero)
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

  // Gráfico de Barras (Média de Membros por Gênero)
  barSeries: ApexAxisChartSeries = [{
    name: 'Média de Membros',
    data: []
  }];
  barChart: ApexChart = {
    type: 'bar',
    height: 350
  };
  barXAxis: ApexXAxis = {
    categories: [],
    labels: {
      rotate: -45,
      style: { fontSize: '12px' }
    }
  };
  barTitle: ApexTitleSubtitle = {
    text: 'Média de Membros por Gênero',
    align: 'left'
  };

  // Gráfico de Linha (Popularidade Média por Gênero)
  lineSeries: ApexAxisChartSeries = [{
    name: 'Popularidade Média',
    data: []
  }];
  lineChart: ApexChart = {
    type: 'line',
    height: 300
  };
  lineXAxis: ApexXAxis = {
    categories: []
  };
  lineTitle: ApexTitleSubtitle = {
    text: 'Popularidade Média por Gênero',
    align: 'left'
  };

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeService.getDistribuicaoGenero().subscribe((data) => {
      if (data) {
        this.initCharts(data);
      }
    });
  }

  initCharts(data: any): void {
    if (data.contagem_generos && data.contagem_generos.length) {
      this.donutSeries = data.contagem_generos.map((g: any) => g.quantidade);
      this.donutLabels = data.contagem_generos.map((g: any) => g.genero);
    }

    if (data.media_membros && data.media_membros.length) {
      this.barSeries = [{
        name: 'Média de Membros',
        data: data.media_membros.map((m: any) => m.media_membros)
      }];
      this.barXAxis.categories = data.media_membros.map((m: any) => m.generos);
    }

    if (data.media_popularidade && data.media_popularidade.length) {
      this.lineSeries = [{
        name: 'Popularidade Média',
        data: data.media_popularidade.map((p: any) => p.media_popularidade)
      }];
      this.lineXAxis.categories = data.media_popularidade.map((p: any) => p.generos);
    }
  }
}
