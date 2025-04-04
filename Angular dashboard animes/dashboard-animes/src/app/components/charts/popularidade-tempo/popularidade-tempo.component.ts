import {Component, OnInit} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexDataLabels,
  ApexYAxis, ChartComponent
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {CommonModule, NgIf} from '@angular/common';
import {AnimeService} from '../../../services/anime.service';

@Component({
  selector: 'app-popularidade-tempo',
  imports: [
    ChartComponent,
    NgApexchartsModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './popularidade-tempo.component.html',
  styleUrl: './popularidade-tempo.component.scss'
})
export class PopularidadeTempoComponent implements OnInit{
  series: ApexAxisChartSeries = [];
  chart: ApexChart = {
    type: 'line',
    height: 350
  };
  title: ApexTitleSubtitle = {
    text: 'Popularidade Média por Temporada'
  };
  xaxis: ApexXAxis = {
    categories: [],
    title: {
      text: 'Temporada'
    }
  };
  yaxis: ApexYAxis = {
    title: {
      text: 'Popularidade'
    }
  };
  stroke: ApexStroke = {
    curve: 'smooth'
  };
  dataLabels: ApexDataLabels = {
    enabled: true
  };

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeService.getPopularidadeTempo().subscribe((data) => {
      const temporadas = data.popularidade_media_temporada.map((item: any) => item.temporada);
      const medias = data.popularidade_media_temporada.map((item: any) => item.popularidade);

      this.series = [
        {
          name: 'Popularidade média',
          data: medias
        }
      ];
      this.xaxis.categories = temporadas;
    });
  }
}
