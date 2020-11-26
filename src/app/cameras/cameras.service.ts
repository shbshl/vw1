import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {delay, filter, map, tap, toArray} from 'rxjs/operators';

import {Camera} from './camera.model';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {
  public cameras: BehaviorSubject<Camera[]> = new BehaviorSubject<Camera[]>([]);
  private URL = 'https://videowall-ttk.firebaseio.com/cameras.json';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Camera[]>(this.URL)
      .pipe(
        delay(500),
        tap(cameras => this.cameras.next(cameras))
      );
  }

  getByCode(code: string): Observable<Camera> {
    return this.http.get<Camera[]>(this.URL)
      .pipe(
        map(items => items.filter(item => item.CODE === code)),
        filter(items => items && items.length > 0),
        map(items => {
          if (items.length == 1) {
            return items[0];
          } else {
            return null;
          }
        })
      );

  }

  // local service function for test purpose to shuffle elements in array
  private _shuffle<T>(arr: Array<T>): Array<T> {
    return arr.map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }
}
