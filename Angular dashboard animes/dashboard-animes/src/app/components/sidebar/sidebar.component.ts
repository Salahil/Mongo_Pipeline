import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  items = [
    { label: 'Mais assistidos', icon: 'visibility', value: 'mais-assistidos' },
    { label: 'Distribuição por gênero', icon: 'pie_chart', value: 'distribuicao-genero' },
    { label: 'Popularidade no tempo', icon: 'timeline', value: 'popularidade-tempo' },
    { label: 'Score vs Popularidade', icon: 'scatter_plot', value: 'score-vs-popularidade' },
    { label: 'Comparar Tipos', icon: 'hub', value: 'comparar-tipos' },
  ];
}
