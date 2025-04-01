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
    MatButtonModule // IMPORTANTE para o routerLink funcionar
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;
  items = [
    { label: 'Mais assistidos', icon: 'visibility', value: 'mais-assistidos' },
    { label: 'Notas mais altas', icon: 'star', value: 'notas-altas' },
    { label: 'Favoritos', icon: 'favorite', value: 'favoritos' },
    { label: 'Por gênero', icon: 'category', value: 'generos' },
    { label: 'Classificação', icon: 'block', value: 'classificacao' },
    { label: 'Temporada', icon: 'calendar_today', value: 'temporada' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
