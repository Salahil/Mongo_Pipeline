import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private baseUrl = 'http://localhost:8000/animes/exportar';

  constructor(private http: HttpClient) {}

  getAnimes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
