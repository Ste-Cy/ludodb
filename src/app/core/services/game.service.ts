import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../models/game';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameUrl = environment.GAME_URL;
  uploadUrl = environment.UPLOAD_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private _http: HttpClient) { }

  getGames(): Observable<any> {
    return this._http.get<any>(`${this.gameUrl}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
  getGameById(id: number): Observable<any> {
    return this._http.get<any>(`${this.gameUrl}/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  addGame(game: Game): Observable<any> {
    const gameJSON = JSON.stringify(game);
    return this._http
      .post<string>(`${this.gameUrl}`, gameJSON, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  }

  updateGame(game: Game, gameId: number): Observable<any> {
    const gameJSON = JSON.stringify(game);
    return this._http
      .put<string>(`${this.gameUrl}/${gameId}`, gameJSON, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  }

  uploadCover(image: File, gameId: number): Observable<any> {
    const imgUpload = new FormData();
    imgUpload.append('cover', image);
    return this._http
      .put<any>(`${this.uploadUrl}/${gameId}`, imgUpload)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  }

  deleteGame(gameId: number): Observable<any> {
    return this._http.delete(`${this.gameUrl}/${gameId}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    );
  }
}
