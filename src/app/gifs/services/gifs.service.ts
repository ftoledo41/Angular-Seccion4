import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public giftList: Gif[] = [];

  private _tagsHistory: string[] = [];

  private apiKey: string = 'KTI9gomBQfQ7C4srZYRqNp1V8xw03jQn';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase(); //para buscar mas facilmente si un termino ya fue ingresado

    // Si el arreglo contiene el elemento que se esta ingresando
    if (this._tagsHistory.includes(tag)) {
      // eliminamos el tag; (oldTag) => oldTag !== tag solo dejamos pasar a los que son distintos del tag ingresado
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    // agregamos el nuevo/antiguo elemento al inicio del arreglo
    this._tagsHistory.unshift(tag);

    //Para no pasar de 10
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        // console.log(resp);
        // console.log(`${this.serviceUrl}/search`, { params });
        this.giftList = resp.data;
        // console.log({gifs: this.giftList})
      });
  }
}
