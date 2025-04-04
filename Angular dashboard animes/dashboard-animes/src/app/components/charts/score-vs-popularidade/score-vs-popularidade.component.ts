import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../../services/anime.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexTooltip
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

export interface PontoAnime {
  x: number;
  y: number;
  z: number;
  nome: string;
  nome_ingles: string;
}

@Component({
  selector: 'app-score-vs-popularidade',
  templateUrl: './score-vs-popularidade.component.html',
  styleUrls: ['./score-vs-popularidade.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule, CommonModule]
})
export class ScoreVsPopularidadeComponent implements OnInit {
  scatterSeries: ApexAxisChartSeries = [];
  scatterChart: ApexChart = {
    type: 'scatter',
    height: 350,
    animations: {
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    toolbar: {
      show: true
    }
  };
  scatterXAxis: ApexXAxis = {
    title: { text: 'Nota' },
    labels: {
      formatter: (val: string): string => parseFloat(val).toFixed(1)
    }
  };
  scatterYAxis: ApexYAxis = {
    title: { text: 'Popularidade' }
  };
  scatterTitle: ApexTitleSubtitle = {
    text: '⚪ Gráfico de Dispersão ● Nota x Popularidade'
  };
  scatterTooltip: ApexTooltip = {
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const data = w.config.series[seriesIndex].data[dataPointIndex];
      return `
        <div style="padding: 8px;">
          <strong>${data.nome}</strong><br/>
          Nota: ${data.x}<br/>
          Popularidade: ${data.y}
        </div>
      `;
    }
  };


  bubbleSeries: ApexAxisChartSeries = [];
  bubbleChart: ApexChart = {
    type: 'bubble',
    height: 350,
    toolbar: {
      show: true
    }
  };
  bubbleXAxis: ApexXAxis = {
    title: { text: 'Popularidade' }
  };
  bubbleYAxis: ApexYAxis = {
    title: { text: 'Nota' }
  };
  bubbleTitle: ApexTitleSubtitle = {
    text: '📍 Bubble Chart ● Membros como tamanho da bolha'
  };
  bubbleTooltip: ApexTooltip = {
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const data = w.config.series[seriesIndex].data[dataPointIndex] as PontoAnime;
      return `
        <div style="padding: 8px;">
          <strong>${data.nome}</strong><br/>
          Nota: ${data.y}<br/>
          Popularidade: ${data.x}<br/>
          Membros (escala): ${data.z}
        </div>
      `;
    }
  };


  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeService.getScoreVsPopularidade().subscribe(animes => {
      const dadosValidos = animes
        .filter((a: any) => a.nota && a.popularidade && a.membros)
        .slice(0, 100); // limitar a 100 para melhor desempenho

      const pontos: PontoAnime[] = dadosValidos.map((anime: any) => ({
        x: parseFloat(anime.nota.toFixed(2)),
        y: parseFloat(anime.popularidade.toFixed(0)),
        z: Math.min(parseFloat((anime.membros / 1000).toFixed(2)), 50),
        nome: anime.nome,
        nome_ingles: anime.nome_ingles
      }));

      this.scatterSeries = [
        {
          name: 'Animes',
          data: pontos.map(p => ({
            x: p.x,
            y: p.y,
            nome: p.nome
          }))
        }
      ];


      this.bubbleSeries = [
        {
          name: 'Animes',
          data: pontos
        }
      ];
    });
  }
}
