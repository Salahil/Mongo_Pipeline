import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopAssistidosComponent } from './components/charts/top-assistidos/top-assistidos.component';
import { DistribuicaoGeneroComponent } from './components/charts/distribuicao-genero/distribuicao-genero.component';
import { PopularidadeTempoComponent } from './components/charts/popularidade-tempo/popularidade-tempo.component';
import { CorrelacoesComponent } from './components/charts/correlacoes/correlacoes.component';
import { ScoreVsPopularidadeComponent } from './components/charts/score-vs-popularidade/score-vs-popularidade.component';
import { CompararTiposComponent } from './components/charts/comparar-tipos/comparar-tipos.component';
import { TabelaComponent } from './components/charts/tabela/tabela.component';
import { MaisAssistidosComponent } from './components/charts/mais-assistidos/mais-assistidos.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'mais-assistidos', component: MaisAssistidosComponent },
      { path: 'top-assistidos', component: TopAssistidosComponent },
      { path: 'distribuicao-genero', component: DistribuicaoGeneroComponent },
      { path: 'popularidade-tempo', component: PopularidadeTempoComponent },
      { path: 'correlacoes', component: CorrelacoesComponent },
      { path: 'score-vs-popularidade', component: ScoreVsPopularidadeComponent },
      { path: 'comparar-tipos', component: CompararTiposComponent },
      { path: 'tabela', component: TabelaComponent },
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard/mais-assistidos',
    pathMatch: 'full'
  }
];

