import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaisAssistidosComponent } from './components/charts/mais-assistidos/mais-assistidos.component';
import { NotasAltasComponent } from './components/charts/notas-altas/notas-altas.component';
import { PopularesComponent } from './components/charts/populares/populares.component';
import { TemporadaComponent } from './components/charts/temporada/temporada.component';
import { GenerosComponent } from './components/charts/generos/generos.component';
import { FavoritosComponent } from './components/charts/favoritos/favoritos.component';
import { ClassificacaoComponent } from './components/charts/classificacao/classificacao.component';


export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'mais-assistidos', component: MaisAssistidosComponent },
      { path: 'notas-altas', component: NotasAltasComponent },
      { path: 'populares', component: PopularesComponent },
      { path: 'temporada', component: TemporadaComponent },
      { path: 'generos', component: GenerosComponent },
      { path: 'favoritos', component: FavoritosComponent },
      { path: 'classificacao', component: ClassificacaoComponent },
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard/mais-assistidos',
    pathMatch: 'full'
  }
];

