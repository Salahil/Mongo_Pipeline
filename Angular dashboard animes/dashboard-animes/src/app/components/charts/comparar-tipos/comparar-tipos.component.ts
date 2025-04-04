import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../../services/anime.service';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

@Component({
  selector: 'app-comparar-tipos',
  templateUrl: './comparar-tipos.component.html',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  styleUrls: ['./comparar-tipos.component.scss']
})
export class CompararTiposComponent implements OnInit {
  // Dados
  tipos: any[] = [];

  // Gráfico de barras agrupadas
  barSeries: ApexAxisChartSeries = [];
  barChart: ApexChart = {
    type: 'bar',
    height: 350
  };
  barXAxis: ApexXAxis = {
    categories: []
  };
  barTitle: ApexTitleSubtitle = {
    text: 'Comparação entre Tipos - Médias de Nota, Popularidade e Membros'
  };

  // Gráfico de radar
  radarSeries: ApexAxisChartSeries = [];
  radarChart: ApexChart = {
    type: 'radar',
    height: 350
  };
  radarTitle: ApexTitleSubtitle = {
    text: 'Radar Comparativo por Tipo'
  };

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeService.getCompararTipos().subscribe(data => {
      this.tipos = data;

      const categorias = this.tipos.map(t => t.tipo);
      this.barXAxis.categories = categorias;

      this.barSeries = [
        {
          name: 'Nota Média',
          data: this.tipos.map(t => parseFloat(t.nota.toFixed(2)))
        },
        {
          name: 'Membros (Média)',
          data: this.tipos.map(t => parseFloat(t.membros.toFixed(2)))
        },
        {
          name: 'Popularidade (Média)',
          data: this.tipos.map(t => parseFloat(t.popularidade.toFixed(2)))
        }
      ];

      this.radarSeries = [
        {
          name: 'Nota Média',
          data: this.tipos.map(t => parseFloat(t.nota.toFixed(2)))
        },
        {
          name: 'Membros',
          data: this.tipos.map(t => parseFloat(t.membros.toFixed(2)))
        },
        {
          name: 'Popularidade',
          data: this.tipos.map(t => parseFloat(t.popularidade.toFixed(2)))
        }
      ];
    });
  }

  getTiposLabels(): string[] {
    return this.tipos?.map(t => t.tipo) || [];
  }
}
