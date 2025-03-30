import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MaisAssistidosComponent } from '../../components/charts/mais-assistidos/mais-assistidos.component';
import { NotasAltasComponent } from '../../components/charts/notas-altas/notas-altas.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    MaisAssistidosComponent,
    NotasAltasComponent,
    NgApexchartsModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
}
