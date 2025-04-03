import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private baseUrl = 'http://localhost:8000/animes';

  constructor(private http: HttpClient) {}

  // Todos os animes
  getAnimes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/exportar`);
  }

  // 1. Top 20 Mais Assistidos
  getTopAssistidos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/top-assistidos`);
  }

  // 2. Distribuição por Gênero
  getDistribuicaoGenero(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/distribuicao-genero`);
  }

  // 3. Popularidade ao longo do tempo
  getPopularidadeTempo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/popularidade-tempo`);
  }

  // 4. Correlações entre métricas
  getCorrelacoes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/correlacoes`);
  }

  // 5. Score vs Popularidade
  getScoreVsPopularidade(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/score-vs-popularidade`);
  }

  // 6. Comparação por Tipo
  getCompararTipos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/comparar-tipos`);
  }

  // 7. Tabela interativa
  getTabelaTop20(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tabela`);
  }
}
