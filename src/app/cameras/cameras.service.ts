import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map, toArray} from 'rxjs/operators';
import {Camera} from './camera.model';

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  URL = 'https://videowall-ttk.firebaseio.com/cameras.json';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.URL);
  }

  getByCode(code: string) : Observable<Camera> {
    return this.http.get(this.URL)
      .pipe(
        map((items: Camera[] )=> items.filter(item => item.CODE === code)),
        filter(items => items && items.length > 0),
        map(items => {
          if (items.length == 1) {
            return items[0];
          }
          else return null;
        })
      );

  }
}
