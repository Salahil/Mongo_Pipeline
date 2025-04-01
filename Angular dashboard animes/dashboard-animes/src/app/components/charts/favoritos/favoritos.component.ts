import {Component, OnInit} from '@angular/core';
import {NgApexchartsModule} from 'ng-apexcharts';
import {CommonModule} from '@angular/common';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive
} from 'ng-apexcharts';
import {AnimeService} from '../../../services/anime.service';
@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './favoritos.component.html',
  standalone: true,
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit{

  animes: any[] = [];

  //grafico pizza
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

  constructor(private animeService: AnimeService){
  }

  ngOnInit(): void {
    this.animeService.getAnimes().subscribe((animes) => {
      // Top 5 por favoritos
      const top5 = [...animes]
        .sort((a, b) => b.favoritos - a.favoritos)
        .slice(0, 5);

      this.donutLabels = top5.map(a => a.nome);
      this.donutSeries = top5.map(a => a.favoritos);
    });
  }
  }

